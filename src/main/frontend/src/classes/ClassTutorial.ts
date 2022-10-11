export class ClassTutorial {
    public tutorialId: string;
    public name: string;
    public baustein: string;
    public level: string;
    public url: string;

    constructor() {
        this.tutorialId = "";
        this.name = "";
        this.baustein = "";
        this.level = "";
        this.url = "";
    }

    get _tutorialId(): string {
        return this.tutorialId;
    }

    set _tutorialId(value: string) {
        this.tutorialId = value;
    }

    get _name(): string {
        return this.name;
    }

    set _name(value: string) {
        this.name = value;
    }

    get _baustein(): string {
        return this.baustein;
    }

    set _baustein(value: string) {
        this.baustein = value;
    }

    get _level(): string {
        return this.level;
    }

    set _level(value: string) {
        this.level = value;
    }

    get _url(): string {
        return this.url;
    }

    set _url(value: string) {
        this.url = value;
    }
}
