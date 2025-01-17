export interface AssociationTable {
    id: string,
    attributes: {
        Name: string | undefined;
        Description: string | undefined;
        Link: string | undefined;
        MeetingTime: string | undefined;
        MeetingLocation: string | undefined;
        // Image: string;
        ContactInfo: string | undefined;
    }
}

export interface ResourceTable {
    id: string,
    attributes: {
        title: string;
        resourceID: string;
        link: string;
    }
}

export interface ContactInfoTable {
    id: string;
    attributes: {
        Email: string;
        PhoneNumber: string;
        Address: string;
    }
};
