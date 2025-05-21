interface Props {
    name: string;
    // weight: number;
    // age: number;
    animalViewTitle?: string

}

export const CardTitleAnimal = ({ name, animalViewTitle }: Props) => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        }}>
            <p className="card__name">{name}</p>
            {animalViewTitle && <p className="card__view">{animalViewTitle}</p>}

        </div>
    )
}