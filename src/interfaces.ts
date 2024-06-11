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