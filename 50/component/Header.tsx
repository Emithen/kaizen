type HeaderProps = { title: string };

export const Header = ({ title }: HeaderProps) => {
    return <h1 className="header">{title}</h1>
}