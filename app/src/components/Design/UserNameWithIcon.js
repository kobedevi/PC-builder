const UserNameWithIcon = ({userName='unknown'}) => {
  return (
    <span style={{marginBottom:"8px", display:"flex", alignItems:"8px"}}>
      <img style={{width:"25px", height:"25px", marginRight:"4px"}} src={'/img/user.svg'} alt='userIcon' />
      {userName ? userName : 'Unknown'}
    </span>
  )
}

export default UserNameWithIcon