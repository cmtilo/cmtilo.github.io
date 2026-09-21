import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_ASSETS } from '../data/mediaConfig';
import { MediaAsset } from '../types';

interface MediaContextType {
  assets: Record<string, MediaAsset>;
  setCustomFile: (assetId: string, file: File) => void;
  batchUploadFiles: (files: FileList | File[]) => { matched: number; unmatched: string[] };
  resetAllAssets: () => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  openContactModal: boolean;
  setOpenContactModal: (open: boolean) => void;
  openAssetModal: boolean;
  setOpenAssetModal: (open: boolean) => void;
  openGitHubModal: boolean;
  setOpenGitHubModal: (open: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  getAssetSrc: (assetId: string) => string;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<Record<string, MediaAsset>>(() => {
    return { ...DEFAULT_ASSETS };
  });
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [openContactModal, setOpenContactModal] = useState<boolean>(false);
  const [openAssetModal, setOpenAssetModal] = useState<boolean>(false);
  const [openGitHubModal, setOpenGitHubModal] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const setCustomFile = (assetId: string, file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setAssets((prev) => {
      const target = prev[assetId];
      if (!target) return prev;
      return {
        ...prev,
        [assetId]: {
          ...target,
          customUrl: objectUrl,
        },
      };
    });
  };

  const batchUploadFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    let matched = 0;
    const unmatched: string[] = [];

    fileArray.forEach((file) => {
      const fileNameLower = file.name.trim().toLowerCase();
      // Match against original filenames or simplified keywords
      let targetKey: string | null = null;

      for (const [key, asset] of Object.entries(DEFAULT_ASSETS)) {
        const origLower = asset.originalFileName.toLowerCase();
        if (fileNameLower === origLower) {
          targetKey = key;
          break;
        }
      }

      // If not exact match, try fuzzy matching
      if (!targetKey) {
        if (fileNameLower.includes('投影片1.') || fileNameLower.includes('slide1.')) targetKey = 'hero';
        else if (fileNameLower.includes('投影片2.') || fileNameLower.includes('slide2.')) targetKey = 'indoor_cleaning';
        else if (fileNameLower.includes('投影片3.mp4') || (fileNameLower.includes('3') && fileNameLower.endsWith('.mp4'))) targetKey = 'communal_washing_video';
        else if (fileNameLower.includes('投影片3.') && !fileNameLower.endsWith('.mp4')) targetKey = 'communal_washing_poster';
        else if (fileNameLower.includes('4_3f') || fileNameLower.includes('3f')) targetKey = 'floor_3f';
        else if (fileNameLower.includes('4_4f') || fileNameLower.includes('4f')) targetKey = 'floor_4f';
        else if (fileNameLower.includes('4_5f') || fileNameLower.includes('5f')) targetKey = 'floor_5f';
        else if (fileNameLower.includes('投影片4.') || fileNameLower.includes('slide4.')) targetKey = 'floor_base';
        else if (fileNameLower.includes('投影片5.') || fileNameLower.includes('slide5.')) targetKey = 'exposed_pipe_a';
        else if (fileNameLower.includes('投影片6.') || fileNameLower.includes('slide6.')) targetKey = 'exposed_pipe_b';
        else if (fileNameLower.includes('投影片11.') || fileNameLower.includes('slide11.')) targetKey = 'completion_video';
        else if (fileNameLower.includes('投影片12.') || fileNameLower.includes('slide12.')) targetKey = 'aerial_video';
      }

      if (targetKey) {
        setCustomFile(targetKey, file);
        matched++;
      } else {
        unmatched.push(file.name);
      }
    });

    return { matched, unmatched };
  };

  const resetAllAssets = () => {
    setAssets({ ...DEFAULT_ASSETS });
  };

  const getAssetSrc = (assetId: string) => {
    const asset = assets[assetId];
    if (!asset) return '';
    return asset.customUrl || asset.defaultUrl;
  };

  return (
    <MediaContext.Provider
      value={{
        assets,
        setCustomFile,
        batchUploadFiles,
        resetAllAssets,
        isMuted,
        setIsMuted,
        openContactModal,
        setOpenContactModal,
        openAssetModal,
        setOpenAssetModal,
        openGitHubModal,
        setOpenGitHubModal,
        activeSection,
        setActiveSection,
        getAssetSrc,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
};
