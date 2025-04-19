import sql from "msnodesqlv8"

export class TournamentService {
    private connectionString = 'Driver=SQL Server;Server=LAPTOP-B149ENMA\\SQLEXPRESS;Database=project;Trusted_Connection=yes;'
    private initFunction = (query: string) => {
        sql.query(this.connectionString, query, (err: any, res: any) => {
            console.log("respuesta", res)
        });
    }


    getTournaments = this.initFunction('SELECT * from tournaments')
}