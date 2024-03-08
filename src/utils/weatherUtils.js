// A helper function to determine the precipitation amount of rain and/or snow
export function getPrecipitationAmount(rain, snow) {
    if (rain !== 0 && snow !== 0) {
        // If there is rain and snow add them together
        return rain + snow;

    } else if (rain !== 0 && snow === 0) {
        return rain;

    } else if (rain === 0 && snow !== 0) {
        return snow;
        
    } else {
        return 0;
    }
}