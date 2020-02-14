export interface Message {
        sender: {
            firstName: string;
            lastName: string;
            email: string;
        };
        receiver: {
            firstName: string;
            lastName: string;
            email: string;
        };
        message: string;
        date: string;
}
