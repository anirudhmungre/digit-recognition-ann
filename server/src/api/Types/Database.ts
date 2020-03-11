export class Select {
    select: string[];
    from: string;
    where?: {}
}

export class Insert {
    into: string;
    insert: {};
    return: string[];
}

export class Update {
    update: string;
    set: {};
    where?: {};
    return: string[];
}
