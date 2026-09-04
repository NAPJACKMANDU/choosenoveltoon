export interface MainSearchFilterProps {
    selectedTags: string[];
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface novelToonData {
    url? : string;
    title? : string;
    author? : string;
    date : string;
    is_adult? : string;
    views : number;
    price : number;
    likes : number;
    category? : string;
    summary? : string;
    cpName?: string[];
}

export interface filterTagData {
    filterTag : string[];
    novelToonListData: (data: novelToonData[]) => void;
}