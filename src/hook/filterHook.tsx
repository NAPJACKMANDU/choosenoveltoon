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
import { binDolData } from '../component/dolRight/bindol';
import { shongDolData } from '../component/dolRight/shongdol';
import { shoDolData } from '../component/dolRight/shodol';
import { tonDolData } from '../component/dolRight/tondol';
import { heeDolData } from '../component/dolRight/heedol';
import { shoHeeData } from '../component/heeRight/shohee';
import { dolHeeData } from '../component/heeRight/dolhee';
import { shongHeeData } from '../component/heeRight/shonghee';
import { binHeeData } from '../component/heeRight/binhee';
import { tonHeeData } from '../component/heeRight/tonhee';
import { dolShoData } from '../component/shoRight/dolsho';
import { shongShoData } from '../component/shoRight/shongsho';
import { binShoData } from '../component/shoRight/binsho';
import { heeShoData } from '../component/shoRight/heesho';
import { tonShoData } from '../component/shoRight/tonsho';
import { shoBinData } from '../component/binRight/shobin';
import { dolBinData } from '../component/binRight/dolbin';
import { heeBinData } from '../component/binRight/heebin';
import { tonBinData } from '../component/binRight/tonbin';
import { shongBinData } from '../component/binRight/shongbin';

export const useFilterHook = (filterTag: string[]) => {
  const [filteredPosts, setFilteredPosts] = useState<novelToonData[]>([]);

  const handlers: Record<string, novelToonData[]> = {

    "돌숕" : dolShoData,
    "은숕" : dolShoData,
    "석숕" : dolShoData,
    "숑숕" : shongShoData,
    "넨숕" : binShoData,
    "또숕" : heeShoData,
    "히숕" : heeShoData,
    "톤숕" : tonShoData,
    "숕른" : [...dolShoData, ...shongShoData, ...binShoData, ...heeShoData, ...tonShoData],

    "숕석" : shoDolData,
    "숕은" : shoDolData,
    "숕돌" : shoDolData,
    "숑석" : shongDolData,
    "숑은" : shongDolData,
    "숑돌" : shongDolData,
    "넨석" : binDolData,
    "넨은" : binDolData,
    "넨돌" : binDolData,
    "히석" : heeDolData,
    "히은" : heeDolData,
    "히돌" : heeDolData,
    "또석" : heeDolData,
    "또은" : heeDolData,
    "또돌" : heeDolData,
    "톤석" : tonDolData,
    "톤은" : tonDolData,
    "톤돌" : tonDolData,
    "돌른": [...shoDolData, ...shongDolData, ...binDolData, ...heeDolData, ...tonDolData],

    "숕숑": shoShongData,
    "돌숑": dolShongData,
    "은숑": dolShongData,
    "석숑": dolShongData,
    "넨숑": binShongData,
    "또숑": heeShongData,
    "히숑": heeShongData,
    "톤숑": tonShongData,
    "숑른": [...shoShongData, ...dolShongData, ...binShongData, ...heeShongData, ...tonShongData],

    "숕넨" : shoBinData,
    "돌넨" : dolBinData,
    "은넨" : dolBinData,
    "석넨" : dolBinData,
    "숑넨" : shongBinData,
    "또넨" : heeBinData,
    "히넨" : heeBinData,
    "톤넨" : tonBinData,
    "넨른" : [...shoBinData, ...dolBinData, ...shongBinData, ...heeBinData, ...tonBinData],

    "숕히": shoHeeData,
    "숕또": shoHeeData,
    "돌히": dolHeeData,
    "석또": dolHeeData,
    "숑히": shongHeeData,
    "숑또": shongHeeData,
    "넨히": binHeeData,
    "넨또": binHeeData,
    "톤히": tonHeeData,
    "톤또": tonHeeData,
    "또른": [...shoHeeData, ...dolShongData, ...shongHeeData, ...binHeeData, ...tonHeeData],

    "숕톤": taroTonData,
    "돌톤": dolTonData,
    "석톤": dolTonData,
    "은톤": dolTonData,
    "숑톤": shongTonData,
    "넨톤": binTonData,
    "또톤": heeTonData,
    "히톤": heeTonData,
    "톤른": [...taroTonData, ...shongTonData, ...binTonData, ...dolTonData, ...heeTonData]
  };

  useEffect(() => {

    const notKey = [
      "돌숑", "석숑", "또숑", "석톤", "은톤", "히톤", "숕돌", "숕은",
      "숕히", "톤은", "톤돌", "톤히", "넨은", "넨돌", "숑은", "숑돌",
      "넨히", "은숕", "석숕", "히숕", "은넨", "석넨", "돌히", "숑히",
      "히돌", "히은", "히석", "또은", 
      
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