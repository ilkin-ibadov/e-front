import CategoryForm from "../_components/CategoryForm"

const Edit = ({params}) => {
    const categoryId = params.categoryId
    return (
        <CategoryForm type="edit" categoryId={categoryId}/>
    )
}

export default Edit