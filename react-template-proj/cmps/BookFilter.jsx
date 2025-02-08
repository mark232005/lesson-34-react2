
const {useState}=React

export function BookFilter({filterBy,onSetFilterBy}){
const [filterByToEdit,setFilterByToEdit]=useState({...filterBy})


function onHandleChange(ev){
    const {value,type}=ev.target
    if(type==='range'){
        const num=+value
        setFilterByToEdit(prevFilterBy=>({...prevFilterBy,price:num}))
    }
    if(type==='text'){

        setFilterByToEdit(prevFilterBy=>({...prevFilterBy,title:value}))
    }
    onSetFilterBy(filterByToEdit)
}


    return(
        <form >
<label htmlFor="title">title:</label>
<input value={filterByToEdit.title} name="title" type="text" id="title" onChange={onHandleChange} />

<label htmlFor="minPrice"> Min Price</label>
<input value={filterByToEdit.price} type="range" name="price" id="minPrice" onChange={onHandleChange} max={400}/>
        </form>
    )
}