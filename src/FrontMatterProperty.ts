interface FrontMatterProperty{
    id: string
	name: string
	values: Record<string, string>
    isCycle: boolean
    isMulti: boolean
}

class FrontMatterProperty{

	constructor(name: string = "", 
                values: Record<string, string> = {}, 
                id: string = "", 
                isMulti: boolean = false, 
                isCycle: boolean = false){
		this.name = name
		this.values = values
        this.id = id
        this.isCycle = isCycle
        this.isMulti = isMulti
        this.insertNewValue.bind(this)
	}

    public async insertNewValue(value:string): Promise<string>{
        let newKey = 1
        Object.keys(this.values).forEach(key => {
            if(parseInt(key) && parseInt(key) >= newKey){
                newKey = parseInt(key) + 1
            }
        })
        this.values[newKey.toString()] = value
        return newKey.toString()
    }

    static copyProperty(target: FrontMatterProperty, source: FrontMatterProperty){
        target.id = source.id
        target.name = source.name
        target.isCycle = source.isCycle
        target.isMulti = source.isMulti
        Object.keys(source.values).forEach(k => {
            target.values[k] = source.values[k]
        })
        Object.keys(target.values).forEach(k => {
            if(!Object.keys(source.values).includes(k)){
                delete target.values[k]
            }
        })
    }
}

export default FrontMatterProperty