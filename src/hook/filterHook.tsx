import { useMemo } from 'react';
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
  //const [filteredPosts, setFilteredPosts] = useState<novelToonData[]>([]);

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
    "숕왼" : [...shoDolData, ...shoShongData, ...shoBinData, ...shoHeeData, ...taroTonData],

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
    "돌왼" : [...dolShoData, ...dolShongData, ...dolBinData, ...dolHeeData, ...dolTonData],

    "숕숑": shoShongData,
    "돌숑": dolShongData,
    "은숑": dolShongData,
    "석숑": dolShongData,
    "넨숑": binShongData,
    "또숑": heeShongData,
    "히숑": heeShongData,
    "톤숑": tonShongData,
    "숑른": [...shoShongData, ...dolShongData, ...binShongData, ...heeShongData, ...tonShongData],
    "숑왼" : [...shongShoData, ...shongDolData, ...shongBinData, ...shongHeeData, ...shongTonData],

    "숕넨" : shoBinData,
    "돌넨" : dolBinData,
    "은넨" : dolBinData,
    "석넨" : dolBinData,
    "숑넨" : shongBinData,
    "또넨" : heeBinData,
    "히넨" : heeBinData,
    "톤넨" : tonBinData,
    "넨른" : [...shoBinData, ...dolBinData, ...shongBinData, ...heeBinData, ...tonBinData],
    "넨왼" : [...binShoData, ...binDolData, ...binShongData, ...binTonData, ...binHeeData],

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
    "또왼" : [...heeShoData, ...heeDolData, ...heeShongData, ...heeBinData, ...heeTonData],
    "히왼" : [...heeShoData, ...heeDolData, ...heeShongData, ...heeBinData, ...heeTonData],

    "숕톤": taroTonData,
    "돌톤": dolTonData,
    "석톤": dolTonData,
    "은톤": dolTonData,
    "숑톤": shongTonData,
    "넨톤": binTonData,
    "또톤": heeTonData,
    "히톤": heeTonData,
    "톤른": [...taroTonData, ...shongTonData, ...binTonData, ...dolTonData, ...heeTonData],
    "톤왼" : [...tonShoData, ...tonDolData, ...tonShongData, ...tonBinData, ...tonHeeData]
  };

const notKeySet = useMemo(
    () =>
      new Set([
        "돌숑", "석숑", "또숑", "석톤", "은톤", "히톤", "숕돌", "숕은",
        "숕히", "톤은", "톤돌", "톤히", "넨은", "넨돌", "숑은", "숑돌",
        "넨히", "은숕", "석숕", "히숕", "은넨", "석넨", "돌히", "숑히",
        "히돌", "히은", "히석", "또은",
      ]),
    []
  );

  // 1. 전체 handlers의 역방향 맵핑(url -> associatedKeySet)을 1회만 구축
  const urlToKeysMap = useMemo(() => {
    const map = new Map<string, Set<string>>();
    
    Object.entries(handlers).forEach(([key, posts]) => {
      posts.forEach((post) => {
        if (!post.url) return;
        if (!map.has(post.url)) {
          map.set(post.url, new Set());
        }
        map.get(post.url)!.add(key);
      });
    });

    return map;
  }, []); // 초기 로딩 시 단 1회만 계산

  // 2. 태그 변경 시 중복 탐색 없이 Map 참조로 $O(N)$ 연산 처리
  const filteredPosts = useMemo(() => {
    const matchedPosts =
      filterTag.length === 0
        ? Object.values(handlers).flat()
        : filterTag.flatMap((tag) => handlers[tag] ?? []);

    const uniqueMap = new Map<string, novelToonData & { allTags?: string[] }>();

    for (let i = 0; i < matchedPosts.length; i++) {
      const post = matchedPosts[i];
      if (!post.url || uniqueMap.has(post.url)) continue;

      const associatedKeysSet = urlToKeysMap.get(post.url);
      const allAssociatedKeys = associatedKeysSet ? Array.from(associatedKeysSet) : [];

      const matchedCpNames = allAssociatedKeys.filter(
        (key) =>
          !key.endsWith('른') &&
          !key.endsWith('왼') &&
          !notKeySet.has(key)
      );

      uniqueMap.set(post.url, {
        ...post,
        cpName: matchedCpNames,
        allTags: allAssociatedKeys,
      });
    }

    return Array.from(uniqueMap.values());
  }, [filterTag, urlToKeysMap, notKeySet]);

  return filteredPosts;
};