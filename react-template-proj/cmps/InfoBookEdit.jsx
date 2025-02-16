
export function InfoBookEdit(){

return(
    <form >
    <label htmlFor="title">Title:</label>
    <input type="text" name="title" id="title"  />

    <label htmlFor="authors">Authors:</label>
    <input type="text" name="authors" id="authors" />

    <label htmlFor="description">Description:</label>
    <input type="text" name="description" id="description" />

    <label htmlFor="num-pages">Number of pages:</label>
    <input type="text" name="num-pages" id="num-pages" />

    <label htmlFor="price">Price:</label>
    <input type="text" name="price" id="price" />

    <label htmlFor="on-sale">On sale:</label>
    <input type="checkBox" name="on-sale" id="on-sale" />
    <button>Save</button>
</form>

)
}