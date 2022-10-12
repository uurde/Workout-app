export function secondsToMinutes(second: number) {
    return (second / 60).toFixed(1);
}

export function formatSeconds(second: number) {
    const _min = Math.floor(second / 60);
    const _sec = second % 60;

    const minText = `${_min} min`;
    const secText = `${_sec} sec`;
    const connector = "and";

    const sentence = [];
    if (_min > 0) {
        sentence.push(minText);
    }

    if (_min > 0 && _sec > 0) {
        sentence.push(connector);
    }

    if (_sec > 0) {
        sentence.push(secText);
    }

    return sentence.join(" ");
}