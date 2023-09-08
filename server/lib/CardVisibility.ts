export const CardVisibility = {
    FACE_UP:'FACE_UP',
    FACE_DOWN:'FACE_UP',
    HAND:'HAND'
} as const;

export type CardVisibility = typeof CardVisibility[keyof typeof CardVisibility];

