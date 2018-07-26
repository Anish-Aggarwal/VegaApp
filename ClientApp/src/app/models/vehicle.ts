export interface KeyValuePairResource {
    id: number;
    Name: string;
}

export interface Contact {
    name: string;
    email: string;
    phone: string;
}

export interface Vehicle {
    id: number;
    model: KeyValuePairResource;
    make: KeyValuePairResource;
    isRegistered: boolean;
    contact: Contact;
    lastUpdate: string;
    features: KeyValuePairResource[];
}

export interface SaveVehicle {
    id: number;
    modelId: number;
    makeId: number;
    isRegistered: boolean;
    contact: Contact;
    features: number[];
}