import { Ticket } from './ticket';

export class TicketControl {

    private hoy: any = new Date().getDate();

    private tickets: Ticket[] = [];

    private ultimo: number = 0;

    private ultimos4: Ticket[] = [];

    constructor() {

        if (new Date().getDate() !== this.hoy) {

            this.reiniciarConteo();

        }

    }

    atenderTicket( escritorio: any ) {

        if (this.tickets.length === 0) {
            return {
                data: {
                    numero: 0,
                    escritorio: null
                }
            };
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); // borra el último
        }

        return {
            data: {
                numero: atenderTicket.numero,
                escritorio: atenderTicket.escritorio,
            }
        };

    }

    generarNuevoTicket() {

        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);

        this.tickets.push(ticket);

    }

    getUltimosCuatro() {
        return {
            data: this.ultimos4
        };
    }

    getUltimoTicket() {

        return {
            data: {
                ultimoTicket: this.ultimo
            }
        };

    }

    reiniciarConteo() {

        this.tickets = [];

        this.ultimo = 0;

        this.ultimos4 = [];

    }

}
