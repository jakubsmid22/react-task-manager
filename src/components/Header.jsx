
const Header = ({name, logOut}) => {
  return (
    <header className="fixed flex  justify-between px-5 py-2  items-center left-0 right-0">
        <p>{name}</p>
        <p className="cursor-pointer" onClick={logOut}>Log out</p>
    </header>
  )
}

export default Header