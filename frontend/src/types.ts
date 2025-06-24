export type CredentialsMode = 'same-origin' | 'include' | 'omit';

export interface CodeResponse {
    success: boolean;
    data?: {
        code: string;
        style_definitions: string;
        style_bg_color: string;
    };
    error?: string;
}

export interface CodeData {
    code: string;
    style_definitions: string;
    style_bg_color: string;
}

export interface CodeDisplayProps {
    highlightedCode: string;
    styleDefinitions: string;
    backgroundColor: string;
}