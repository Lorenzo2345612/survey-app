export class Survey {
  private _options: SurveyOption[] = [];
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public plusOneVote(id: number) : void{
    for (let option in this._options){
        if (this._options[option].id == id) {
            this._options[option].plusOneVote();
        }
    }
  }

  public addOption(option: string) : void{
    this._options.push(new SurveyOption(this._options.length, option));
  }

  public get options() {
    return this._options;
  }

  public toArray() {
    return {
      name: this.name,
      ids: this._options.map(option => option.id),
      labels: this._options.map(option => option.option),
      values: this._options.map(option => option.votes)
    }
  }

  public get optionValues(){
    return this._options.map(option => option.votes);
  }
}

class SurveyOption {
  private _id: number;
  private _option: string;
  private _votes: number;

  constructor(id: number, option: string) {
    this._id = id;
    this._option = option;
    this._votes = 0;
  }

  public get id() {
    return this._id;
  }

  public get option() {
    return this._option;
  }

  public get votes() {
    return this._votes;
  }

  public plusOneVote() {
    this._votes++;
  }
}
