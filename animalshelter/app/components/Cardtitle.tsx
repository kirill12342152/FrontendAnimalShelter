interface Props {
    name: string;
    // weight: number;
    // age: number;
    animalViewTitle? : string

}

export const CardTitle = ({ name, animalViewTitle }: Props) => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        }}>
            <p className="card__name">{name}</p>
            {animalViewTitle && <p className="card__view">{animalViewTitle}</p>}
            {/* <p className="card__weight">{weight}</p>
            <p className="card__age">{age}</p> */}
        </div>
    )
}