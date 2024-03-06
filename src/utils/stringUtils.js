// Function that replaces nordic letters (used in Finland) to basic ones
// 'Jyväskylä' becomes 'Jyvaskyla'
export const normalizeNordicLetters = (text) => {
    const replacements = {
        'ä': 'a',
        'Ä': 'A',
        'ö': 'o',
        'Ö': 'O',
        'å': 'a',
        'Å': 'A'
    };

    return text.replace(/[äÄöÖåÅøØæÆ]/g, match => replacements[match]);
}