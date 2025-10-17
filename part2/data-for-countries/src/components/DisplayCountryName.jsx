const DisplayCountryName = ({name, userShow, setUserShow}) => {
    return(
        <li>{name}<button onClick={()=>setUserShow({show:true, country:name})}>show</button></li>
    )
}
export default DisplayCountryName