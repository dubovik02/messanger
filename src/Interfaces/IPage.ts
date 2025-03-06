import Block from "../core/block";

export default interface IPage {
    description : string;
    mnemoCode: string;
    component?: Block;
}
