export const COLORS_FOR_DIFFICULTIES = {
    regular: {
        easy: 'hsl(95, 75%, 31%)',
        medium: 'hsl(35,96%,56%)',
        hard: 'hsl(0,86%,55%)',
    },
    contrast: {
        easy: 'hsl(207, 83%, 44%)',
        medium: 'hsl(167, 94%, 25%)',
        hard: 'hsl(350, 100%, 38%)',
    },
}

const CHART_COLORS = [
    'hsl(0, 70%, 50%)',
    'hsl(132, 70%, 50%)',
    'hsl(264, 70%, 50%)',
    'hsl(36, 70%, 50%)',
    'hsl(168, 70%, 50%)',
    'hsl(300, 70%, 50%)',
    'hsl(72, 70%, 50%)',
    'hsl(204, 70%, 50%)',
    'hsl(336, 70%, 50%)',
    'hsl(108, 70%, 50%)',
    'hsl(240, 70%, 50%)',
    'hsl(12, 70%, 50%)',
    'hsl(144, 70%, 50%)',
    'hsl(276, 70%, 50%)',
    'hsl(48, 70%, 50%)',
    'hsl(180, 70%, 50%)',
    'hsl(312, 70%, 50%)',
    'hsl(84, 70%, 50%)',
    'hsl(216, 70%, 50%)',
    'hsl(348, 70%, 50%)',
    'hsl(120, 70%, 50%)',
    'hsl(252, 70%, 50%)',
    'hsl(24, 70%, 50%)',
    'hsl(156, 70%, 50%)',
    'hsl(288, 70%, 50%)',
    'hsl(60, 70%, 50%)',
    'hsl(192, 70%, 50%)',
    'hsl(324, 70%, 50%)',
    'hsl(96, 70%, 50%)',
    'hsl(228, 70%, 50%)'
];

const generateRandomColor = (): string => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 50%)`;
};

export const getColorForIndex = (index: number): string => {
    if (index < CHART_COLORS.length) {
        return CHART_COLORS[index];
    }
    return generateRandomColor();
};