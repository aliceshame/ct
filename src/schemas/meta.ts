import { MenuItem } from '../schemas/menu-item';

export interface Meta {
    title : string;
    menu : MenuItem[];
    fixedDrawer? : boolean;
    PartType? : any;
    PartIcon? : any;
    ReceiverService? : any;
}
