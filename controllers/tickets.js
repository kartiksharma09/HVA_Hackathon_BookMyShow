const Ticket = require("../models/tickets");
const Movie = require("../models/Movies");
const Cinema = require("../models/cinema");
const { validationResult } = require("express-validator");

const validations = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errors;
    } else {
        return false;
    }
};

const bookTickets = async (req, res, next) =>{
    const errors = validations(req);
    if (errors) {
        return next({
            status: 400,
            errors: errors.array()
        });
    }

    const cinemaId = req.params.cinemaId
    const movieId = req.params.movieId

    // Initializing from the req.body
    const { Seats, watchers, bookingDate } = req.body
<<<<<<< HEAD

    const TicketInfo = {
        Seats: Seats,
        watchers: watchers,
        bookingDate: bookingDate
    }
=======
>>>>>>> 2c2ee59c9468352625bba828160b3896ef305c05

    // Find the movie is available or not
    const movie = await Movie.findById(movieId);
    // console.log(movie)
    if (!movie){
        return next({
            status: 404,
            errors: "Movie Not Found"
        })
    }

<<<<<<< HEAD
    // Insure the tickets is booked
    const bookedTickets = await ticketsBooked(req.params.cinemaId);
    console.log(bookedTickets)

    const cinema = await Cinema.findById(cinemaId)
    console.log(cinema)

    // Not available seats
    let seats = cinema.seats;
    console.log(seats)
    const selected_tickets = Seats
    let isBooked = seats.filter((bookedTicket) => {
        return bookedTickets.includes(bookedTicket);
    })

    var responce = false
    for (let index = 0; index < selected_tickets.length; index++) {
        if (seats[index].includes(selected_tickets[index])) {
            responce = true
        } else {
            responce = false
            return next({
                status: 404,
                errors: ["Theses seats are not found", selected_tickets[index]]
            })
        }
=======
    const cinema = await Cinema.findById(cinemaId)
    let seats = cinema.seats;
>>>>>>> 2c2ee59c9468352625bba828160b3896ef305c05

    const Tickets = await Ticket.findOne({ cinemaId })
    if (Tickets){
        const BookedTickets = Tickets.Seats
        for (var index = 0; index < seats; index++){
            if (BookedTickets.includes(Seats[index])){
                return next({
                    status: 400,
                    errors: ["These tickets are already book", Seats[index]]
                })
            }
            if (Seats[index]>seats){
                return next({
                    status: 404,
                    errors: ["These seat not Found", Seats[index]]
                })
            }
        }
    }

    const TicketInfo = {
        Seats: Seats,
        watchers: watchers,
        bookingDate: bookingDate,
        userId :req.user.id,
        movieId : movieId,
        cinemaId : cinemaId,
    }

    const tickets = new Ticket(TicketInfo);
    const response = await tickets.save();

    if (response) {
        return res.status(200).json({"Tickets": response})
    }
}

// const cancel tickets
const cancelTicket = async (req, res, next) => {
    const response = await Ticket.findOneAndDelete({ _id: req.params.ticketId, userId: req.user.id });
    if (!response) {
        return nex({
            status: 404,
            errors: "Tickets Not found"
        })
    }
    return next({
        status: 200,
        errors: "ticket cancel"
    })
}

// get Booked Tikets
const GetTickets = async (req, res, next) => {
    const tickets = await Ticket.find({ userId: req.user.id }).populate('cinemaId');
    if (!tickets.length) {
        return next({ status: 400, errors: "You have not booked any ticket" });
    }
    res.status(200).json(tickets);
};

module.exports = { bookTickets, cancelTicket, GetTickets }

