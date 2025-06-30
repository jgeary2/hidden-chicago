
export type Popup = {
    header: string,
    content: string,
}

export type Point = {
    coordinates?: [number, number],
    key: string,
    location: google.maps.LatLngLiteral,
    popup: Popup,
}

export type PointStyles = {
    fill: string | string[],
    fontSize: number,
    icon: string,
    stroke: string,
    strokeWidth: number,
}

export enum PointOfInterestType {
    MARKER = 'marker',
    POLYGON = 'polygon',
}

export type PointOfInterest = {
    points: Point[],
    styles: PointStyles,
    type: PointOfInterestType,
}