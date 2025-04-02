export type ICons = 'folder_with_content' | 'folder_without_content' | 'file' | 'arrow';

export interface IProps {
    icon: ICons;
    rotate?: number;
    text?: string;
}
