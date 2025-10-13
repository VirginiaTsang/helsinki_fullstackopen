const Person = ({name, number, deleteAction}) => (<li>{name} {number} <button onClick={deleteAction}>delete</button></li>)

export default Person