export function determineStatus(status) {
    switch (status) {
        case 1:
            return 'new'
        case 2:
            return 'process'
        case 3:
            return 'done'
        default:
            throw new Error('Unknown status!')
    }
}

export function determinePriority(priority) {
    switch (priority) {
        case 1:
            return 'high';
        case 2:
            return 'regular';
        case 3:
            return 'low';
        default:
            throw new Error('Unknown priority!');
    }
}