import { useState, useEffect } from 'react';
import type { novelToonData } from '../interface/type';
import { taroTonData } from '../component/tonRight/taroTon';
import { shongTonData } from '../component/tonRight/shongTon';
import { dolTonData } from '../component/tonRight/dolton';
import { binTonData } from '../component/tonRight/binton';
import { heeTonData } from '../component/tonRight/heeton';
import { shoShongData } from '../component/shongRight/shoshong';
import { dolShongData } from '../component/shongRight/dolshong';
import { binShongData } from '../component/shongRight/binshong';
import { heeShongData } from '../component/shongRight/heeshong';
import { tonShongData } from '../component/shongRight/tonshong';

export const useFilterHook = (filterTag: string[]) => {
  const [filteredPosts, setFilteredPosts] = useState<novelToonData[]>([]);

  const handlers: Record<string, novelToonData[]> = {
    "숕톤": taroTonData,
    "돌톤": dolTonData,
    "석톤": dolTonData,
    "은톤": dolTonData,
    "숑톤": shongTonData,
    "넨톤": binTonData,
    "또톤": heeTonData,
    "히톤": heeTonData,
    "톤른": [...taroTonData, ...shongTonData, ...binTonData, ...dolTonData, ...heeTonData],

    "숕숑": shoShongData,
    "돌숑": dolShongData,
    "은숑": dolShongData,
    "석숑": dolShongData,
    "넨숑": binShongData,
    "또숑": heeShongData,
    "히숑": heeShongData,
    "톤숑": tonShongData,
    "숑른": [...shoShongData, ...dolShongData, ...binShongData, ...heeShongData, ...tonShongData]
  };

  useEffect(() => {

    const notKey = [
      "돌숑", "석숑", "또숑", "석톤", "은톤", "히톤"  
    ]

    
    // 1. 태그가 없을 때 vs 있을 때 데이터 가져오기 (handlers 원본 그대로 사용)
    const matchedPosts = filterTag.length === 0
      ? Object.values(handlers).flat()
      : filterTag.flatMap((tag) => handlers[tag] ?? []);

    // 2. URL 기준으로 중복 제거
    const uniqueMap = new Map<string, novelToonData>();

    matchedPosts.forEach((post) => {
      if (!post.url) return;

      if (!uniqueMap.has(post.url)) {
        // handlers에서 '~른'으로 끝나지 않는 키만 골라서 cpName 추출
        const matchedCpNames = Object.entries(handlers)
          .filter(([key]) => !key.endsWith('른')) // '~른' 태그 제외 조건
          .filter(([key]) => !notKey.includes(key))
          .filter(([_, dataList]) => dataList.some((p) => p.url === post.url))
          .map(([key]) => key);

        uniqueMap.set(post.url, {
          ...post,
          cpName: matchedCpNames, // 예: ["숑톤", "넨톤"]
        });
      }
    });

    setFilteredPosts(Array.from(uniqueMap.values()));
  }, [filterTag]);

  return filteredPosts;
};