const Quiz = require('../Models/Quiz')
const Modules = require('../Models/Modules')
const User = require('../Models/User')
const History = require('../Models/History')
const Annee = require('../Models/Annee')
const Coure = require('../Models/Coure')
const Visit = require('../Models/visit')
const Sujet = require('../Models/Sujet')
const moment = require('moment');
const getQuizHome = async (req, res) => {
    try {
        const time = 'jour'
        const quiz = await Quiz.find()
        if (time == 'jour') {
            if (!quiz) {
                const today = new Date();
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - 6);

                const data = [];
                const dayCount = 7;

                for (let i = 0; i < dayCount; i++) {
                    const date = new Date(weekStart);
                    date.setDate(date.getDate() + i);

                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    let quizCorrect = 0;
                    let quizFau = 0;
                    let quizPasRep = 0;


                    data.push({
                        date: dateString,
                        quizCorrect: quizCorrect,
                        quizFau: quizFau,
                        quizPasRep: quizPasRep
                    });
                }

                res.status(200).json(data)
            }
            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - 6);

            const data = [];
            const dayCount = 7;

            for (let i = 0; i < dayCount; i++) {
                const date = new Date(weekStart);
                date.setDate(date.getDate() + i);

                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear().toString();
                const dateString = `${day}/${month}/${year}`;
                const quizDocs = await Quiz.find({ user: req.user.id, date: dateString });
                let quizCorrect = 0;
                let quizFau = 0;
                let quizPasRep = 0;

                quizDocs.forEach((doc) => {
                    const qs = doc.questions;
                    qs.forEach((q) => {
                        if (q.qs.corection === "true") {
                            quizCorrect++;
                        } else if (q.qs.corection === "false") {
                            quizFau++;
                        } else {
                            quizPasRep++;
                        }
                    });
                });

                data.push({
                    date: dateString,
                    quizCorrect: quizCorrect,
                    quizFau: quizFau,
                    quizPasRep: quizPasRep
                });
            }



            console.log(data)
            res.status(200).json(data)
        } else { return res.status(404).send('nothing found !') }
    } catch (error) {
        console.log(error.message)
    }
}
//@ desc get quiz stat
//@route HET /api/stat/quiz/time/:time
//@access privet
const GetQuizStatBytime = async (req, res) => {
    try {
        const { time } = req.params
        const quiz = await Quiz.find()
        if (time == 'jour') {
            if (!quiz) {
                const today = new Date();
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - 6);

                const data = [];
                const dayCount = 7;

                for (let i = 0; i < dayCount; i++) {
                    const date = new Date(weekStart);
                    date.setDate(date.getDate() + i);

                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    let quizCorrect = 0;
                    let quizFau = 0;
                    let quizPasRep = 0;


                    data.push({
                        date: dateString,
                        quizCorrect: quizCorrect,
                        quizFau: quizFau,
                        quizPasRep: quizPasRep
                    });
                }

                res.status(200).json(data)
            }
            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - 6);

            const data = [];
            const dayCount = 7;

            for (let i = 0; i < dayCount; i++) {
                const date = new Date(weekStart);
                date.setDate(date.getDate() + i);

                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear().toString();
                const dateString = `${day}/${month}/${year}`;
                const quizDocs = await Quiz.find({ user: req.user.id, date: dateString });
                let quizCorrect = 0;
                let quizFau = 0;
                let quizPasRep = 0;

                quizDocs.forEach((doc) => {
                    const qs = doc.questions;
                    qs.forEach((q) => {
                        if (q.qs.corection === "true") {
                            quizCorrect++;
                        } else if (q.qs.corection === "false") {
                            quizFau++;
                        } else {
                            quizPasRep++;
                        }
                    });
                });

                data.push({
                    date: dateString,
                    quizCorrect: quizCorrect,
                    quizFau: quizFau,
                    quizPasRep: quizPasRep
                });
            }



            console.log(data)
            res.status(200).json(data)
        } else if (time == 'semaine') {
            if (!quiz) {
                const today = new Date();
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                const weekStart = new Date(monthStart);

                const data = [];
                const weekCount = 4;

                for (let i = 0; i < weekCount; i++) {
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 7);

                    const weekNum = i + 1;
                    const weekString = `semaine ${weekNum}`;

                    let quizCorrect = 0;
                    let quizFau = 0;
                    let quizPasRep = 0;

                    for (let j = 0; j < 6; j++) {
                        const date = new Date(weekStart);
                        date.setDate(weekStart.getDate() + j);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const year = date.getFullYear().toString();
                        const dateString = `${day}/${month}/${year}`;
                    }

                    data.push({
                        date: weekString,
                        quizCorrect: quizCorrect,
                        quizFau: quizFau,
                        quizPasRep: quizPasRep,
                    });

                    weekStart.setDate(weekEnd.getDate() + 1);
                }

                res.status(200).json(data);
            }
            const today = new Date();
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            const weekStart = new Date(monthStart);

            const data = [];
            const weekCount = 4;

            for (let i = 0; i < weekCount; i++) {
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 7);

                const weekNum = i + 1;
                const weekString = `semaine ${weekNum}`;

                let quizCorrect = 0;
                let quizFau = 0;
                let quizPasRep = 0;

                for (let j = 0; j < 6; j++) {
                    const date = new Date(weekStart);
                    date.setDate(weekStart.getDate() + j);
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    const quizDocs = await Quiz.find({ user: req.user.id, date: dateString });

                    quizDocs.forEach((doc) => {
                        const qs = doc.questions;
                        qs.forEach((q) => {
                            if (q.qs.corection === "true") {
                                quizCorrect++;
                            } else if (q.qs.corection === "false") {
                                quizFau++;
                            } else {
                                quizPasRep++;
                            }
                        });
                    });
                }

                data.push({
                    date: weekString,
                    quizCorrect: quizCorrect,
                    quizFau: quizFau,
                    quizPasRep: quizPasRep,
                });

                weekStart.setDate(weekEnd.getDate() + 1);
            }

            console.log(data);
            res.status(200).json(data);

        } else if (time == 'mois') {
            if (!quiz) {
                const today = new Date();
                const yearStart = new Date(today.getFullYear(), 0, 1);

                const data = [];
                const monthCount = 12;

                for (let i = 0; i < monthCount; i++) {
                    const date = new Date(yearStart);
                    date.setMonth(date.getMonth() + i);

                    const monthIndex = date.getMonth();
                    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
                    const year = date.getFullYear().toString();
                    const monthString = `${monthIndex + 1}/${year}`;
                    let quizCorrect = 0;
                    let quizFau = 0;
                    let quizPasRep = 0;

                    data.push({
                        date: monthName,
                        quizCorrect: quizCorrect,
                        quizFau: quizFau,
                        quizPasRep: quizPasRep
                    });
                }

                res.status(200).json(data);
            }
            const today = new Date();
            const yearStart = new Date(today.getFullYear(), 0, 1);

            const data = [];
            const monthCount = 12;

            for (let i = 0; i < monthCount; i++) {
                const date = new Date(yearStart);
                date.setMonth(date.getMonth() + i);

                const monthIndex = date.getMonth();
                const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
                const year = date.getFullYear().toString();
                const monthString = `${monthIndex + 1}/${year}`;
                const quizDocs = await Quiz.find({ user: req.user.id, date: { $regex: `${monthString}/*` } });
                let quizCorrect = 0;
                let quizFau = 0;
                let quizPasRep = 0;

                quizDocs.forEach((doc) => {
                    const qs = doc.questions;
                    qs.forEach((q) => {
                        if (q.qs.corection === "true") {
                            quizCorrect++;
                        } else if (q.qs.corection === "false") {
                            quizFau++;
                        } else {
                            quizPasRep++;
                        }
                    });
                });

                data.push({
                    date: monthName,
                    quizCorrect: quizCorrect,
                    quizFau: quizFau,
                    quizPasRep: quizPasRep
                });
            }

            console.log(data);
            res.status(200).json(data);

        } else { return res.status(404).send('nothing found !') }
    } catch (error) {
        console.log(error.message)
    }
}
//@ desc get quiz stat
//@route HET /api/stat/quiz/time/module/:module/:time
//@access privet
const GetQuizStatByModuleAndTime = async (req, res) => {
    try {
        const { time, module } = req.params
        const quiz = await Quiz.find()
        if (!quiz) {
            return res.status(400).send('pa de quiz')
        }
        if (time == 'jour') {
            const modules = await Quiz.findOne({ module: module })
            if (!modules) {
                const today = new Date();
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - 6);

                const data = [];
                const dayCount = 7;

                for (let i = 0; i < dayCount; i++) {
                    const date = new Date(weekStart);
                    date.setDate(date.getDate() + i);

                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    let quizCorrect = 0;
                    let quizFau = 0;
                    let quizPasRep = 0;

                    data.push({
                        date: dateString,
                        quizCorrect: quizCorrect,
                        quizFau: quizFau,
                        quizPasRep: quizPasRep
                    });
                }
                console.log(data)
                return res.status(200).json(data)
            }
            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - 6);

            const data = [];
            const dayCount = 7;

            for (let i = 0; i < dayCount; i++) {
                const date = new Date(weekStart);
                date.setDate(date.getDate() + i);

                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear().toString();
                const dateString = `${day}/${month}/${year}`;
                const quizDocs = await Quiz.find({ user: req.user.id, module: module, date: dateString });
                let quizCorrect = 0;
                let quizFau = 0;
                let quizPasRep = 0;

                quizDocs.forEach((doc) => {
                    const qs = doc.questions;
                    qs.forEach((q) => {
                        if (q.qs.corection === "true") {
                            quizCorrect++;
                        } else if (q.qs.corection === "false") {
                            quizFau++;
                        } else {
                            quizPasRep++;
                        }
                    });
                });

                data.push({
                    date: dateString,
                    quizCorrect: quizCorrect,
                    quizFau: quizFau,
                    quizPasRep: quizPasRep
                });
            }



            console.log(data)
            res.status(200).json(data)
        } else if (time == 'semaine') {
            const modules = await Quiz.findOne({ module: module })
            if (!modules) {
                const today = new Date();
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                const weekStart = new Date(monthStart);

                const data = [];
                const weekCount = 4;

                for (let i = 0; i < weekCount; i++) {
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 7);

                    const weekNum = i + 1;
                    const weekString = `semaine ${weekNum}`;

                    let quizCorrect = 0;
                    let quizFau = 0;
                    let quizPasRep = 0;

                    for (let j = 0; j < 6; j++) {
                        const date = new Date(weekStart);
                        date.setDate(weekStart.getDate() + j);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const year = date.getFullYear().toString();
                        const dateString = `${day}/${month}/${year}`;
                    }

                    data.push({
                        date: weekString,
                        quizCorrect: quizCorrect,
                        quizFau: quizFau,
                        quizPasRep: quizPasRep,
                    });

                    weekStart.setDate(weekEnd.getDate() + 1);
                }
                console.log(data)
                return res.status(200).json(data)
            }
            const today = new Date();
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            const weekStart = new Date(monthStart);

            const data = [];
            const weekCount = 4;

            for (let i = 0; i < weekCount; i++) {
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 7);

                const weekNum = i + 1;
                const weekString = `semaine ${weekNum}`;

                let quizCorrect = 0;
                let quizFau = 0;
                let quizPasRep = 0;

                for (let j = 0; j < 6; j++) {
                    const date = new Date(weekStart);
                    date.setDate(weekStart.getDate() + j);
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    const quizDocs = await Quiz.find({ user: req.user.id, module: module, date: dateString });

                    quizDocs.forEach((doc) => {
                        const qs = doc.questions;
                        qs.forEach((q) => {
                            if (q.qs.corection === "true") {
                                quizCorrect++;
                            } else if (q.qs.corection === "false") {
                                quizFau++;
                            } else {
                                quizPasRep++;
                            }
                        });
                    });
                }

                data.push({
                    date: weekString,
                    quizCorrect: quizCorrect,
                    quizFau: quizFau,
                    quizPasRep: quizPasRep,
                });

                weekStart.setDate(weekEnd.getDate() + 1);
            }

            console.log(data);
            res.status(200).json(data);

        } else if (time == 'mois') {
            const modules = await Quiz.findOne({ module: module })
            if (!modules) {
                const today = new Date();
                const yearStart = new Date(today.getFullYear(), 0, 1);

                const data = [];
                const monthCount = 12;

                for (let i = 0; i < monthCount; i++) {
                    const date = new Date(yearStart);
                    date.setMonth(date.getMonth() + i);

                    const monthIndex = date.getMonth();
                    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
                    const year = date.getFullYear().toString();
                    const monthString = `${monthIndex + 1}/${year}`;
                    let quizCorrect = 0;
                    let quizFau = 0;
                    let quizPasRep = 0;

                    data.push({
                        date: monthName,
                        quizCorrect: quizCorrect,
                        quizFau: quizFau,
                        quizPasRep: quizPasRep
                    });
                }
                console.log(data)
                return res.status(200).json(data)
            }
            const today = new Date();
            const yearStart = new Date(today.getFullYear(), 0, 1);

            const data = [];
            const monthCount = 12;

            for (let i = 0; i < monthCount; i++) {
                const date = new Date(yearStart);
                date.setMonth(date.getMonth() + i);

                const monthIndex = date.getMonth();
                const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
                const year = date.getFullYear().toString();
                const monthString = `${monthIndex + 1}/${year}`;
                const quizDocs = await Quiz.find({ user: req.user.id, module: module, date: { $regex: `${monthString}/*` } });
                let quizCorrect = 0;
                let quizFau = 0;
                let quizPasRep = 0;

                quizDocs.forEach((doc) => {
                    const qs = doc.questions;
                    qs.forEach((q) => {
                        if (q.qs.corection === "true") {
                            quizCorrect++;
                        } else if (q.qs.corection === "false") {
                            quizFau++;
                        } else {
                            quizPasRep++;
                        }
                    });
                });

                data.push({
                    date: monthName,
                    quizCorrect: quizCorrect,
                    quizFau: quizFau,
                    quizPasRep: quizPasRep
                });
            }

            console.log(data);
            res.status(200).json(data);

        } else { return res.status(404).send('nothing found !') }
    } catch (error) {
        console.log(error.message)
    }
}
//@ desc get quiz stat
//@route HET /api/stat/quiz/time/annee/:time/:annee
//@access privet
const GetQuizStatByTimeAndAnnee = async (req, res) => {
    try {
        const { time, annee } = req.params
        const quiz = await Quiz.find()
        if (!quiz) {
            return res.status(400).send('0')
        }
        if (time == 'jour') {
            const modules = await Quiz.findOne({ anneeScol: annee })
            if (!modules) {
                const today = new Date();
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - 6);

                const data = [];
                const dayCount = 7;

                for (let i = 0; i < dayCount; i++) {
                    const date = new Date(weekStart);
                    date.setDate(date.getDate() + i);

                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    let quizCorrect = 0;
                    let quizFau = 0;
                    let quizPasRep = 0;


                    data.push({
                        date: dateString,
                        quizCorrect: quizCorrect,
                        quizFau: quizFau,
                        quizPasRep: quizPasRep
                    });
                }
                return res.status(200).json(data)
            }

            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - 6);

            const data = [];
            const dayCount = 7;

            for (let i = 0; i < dayCount; i++) {
                const date = new Date(weekStart);
                date.setDate(date.getDate() + i);

                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear().toString();
                const dateString = `${day}/${month}/${year}`;
                const quizDocs = await Quiz.find({ user: req.user.id, anneeScol: annee, date: dateString });
                let quizCorrect = 0;
                let quizFau = 0;
                let quizPasRep = 0;

                quizDocs.forEach((doc) => {
                    const qs = doc.questions;
                    qs.forEach((q) => {
                        if (q.qs.corection === "true") {
                            quizCorrect++;
                        } else if (q.qs.corection === "false") {
                            quizFau++;
                        } else {
                            quizPasRep++;
                        }
                    });
                });

                data.push({
                    date: dateString,
                    quizCorrect: quizCorrect,
                    quizFau: quizFau,
                    quizPasRep: quizPasRep
                });
            }



            console.log(data)
            res.status(200).json(data)
        } else if (time == 'semaine') {
            const modules = await Quiz.findOne({ anneeScol: annee })
            if (!modules) {
                const today = new Date();
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                const weekStart = new Date(monthStart);

                const data = [];
                const weekCount = 4;

                for (let i = 0; i < weekCount; i++) {
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 7);

                    const weekNum = i + 1;
                    const weekString = `semaine ${weekNum}`;

                    let quizCorrect = 0;
                    let quizFau = 0;
                    let quizPasRep = 0;

                    for (let j = 0; j < 6; j++) {
                        const date = new Date(weekStart);
                        date.setDate(weekStart.getDate() + j);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const year = date.getFullYear().toString();
                        const dateString = `${day}/${month}/${year}`;
                    }

                    data.push({
                        date: weekString,
                        quizCorrect: quizCorrect,
                        quizFau: quizFau,
                        quizPasRep: quizPasRep,
                    });

                    weekStart.setDate(weekEnd.getDate() + 1);
                }
                return res.status(200).json(data)
            }
            const today = new Date();
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            const weekStart = new Date(monthStart);

            const data = [];
            const weekCount = 4;

            for (let i = 0; i < weekCount; i++) {
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 7);

                const weekNum = i + 1;
                const weekString = `semaine ${weekNum}`;

                let quizCorrect = 0;
                let quizFau = 0;
                let quizPasRep = 0;

                for (let j = 0; j < 6; j++) {
                    const date = new Date(weekStart);
                    date.setDate(weekStart.getDate() + j);
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    const quizDocs = await Quiz.find({ user: req.user.id, anneeScol: annee, date: dateString });

                    quizDocs.forEach((doc) => {
                        const qs = doc.questions;
                        qs.forEach((q) => {
                            if (q.qs.corection === "true") {
                                quizCorrect++;
                            } else if (q.qs.corection === "false") {
                                quizFau++;
                            } else {
                                quizPasRep++;
                            }
                        });
                    });
                }

                data.push({
                    date: weekString,
                    quizCorrect: quizCorrect,
                    quizFau: quizFau,
                    quizPasRep: quizPasRep,
                });

                weekStart.setDate(weekEnd.getDate() + 1);
            }

            console.log(data);
            res.status(200).json(data);

        } else if (time == 'mois') {
            const modules = await Quiz.findOne({ anneeScol: annee })
            if (!modules) {
                const today = new Date();
                const yearStart = new Date(today.getFullYear(), 0, 1);

                const data = [];
                const monthCount = 12;

                for (let i = 0; i < monthCount; i++) {
                    const date = new Date(yearStart);
                    date.setMonth(date.getMonth() + i);

                    const monthIndex = date.getMonth();
                    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
                    const year = date.getFullYear().toString();
                    const monthString = `${monthIndex + 1}/${year}`;
                    let quizCorrect = 0;
                    let quizFau = 0;
                    let quizPasRep = 0;

                    data.push({
                        date: monthName,
                        quizCorrect: quizCorrect,
                        quizFau: quizFau,
                        quizPasRep: quizPasRep
                    });
                }

                return res.status(200).json(data)
            }
            const today = new Date();
            const yearStart = new Date(today.getFullYear(), 0, 1);

            const data = [];
            const monthCount = 12;

            for (let i = 0; i < monthCount; i++) {
                const date = new Date(yearStart);
                date.setMonth(date.getMonth() + i);

                const monthIndex = date.getMonth();
                const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
                const year = date.getFullYear().toString();
                const monthString = `${monthIndex + 1}/${year}`;
                const quizDocs = await Quiz.find({ user: req.user.id, anneeScol: annee, date: { $regex: `${monthString}/*` } });
                let quizCorrect = 0;
                let quizFau = 0;
                let quizPasRep = 0;

                quizDocs.forEach((doc) => {
                    const qs = doc.questions;
                    qs.forEach((q) => {
                        if (q.qs.corection === "true") {
                            quizCorrect++;
                        } else if (q.qs.corection === "false") {
                            quizFau++;
                        } else {
                            quizPasRep++;
                        }
                    });
                });

                data.push({
                    date: monthName,
                    quizCorrect: quizCorrect,
                    quizFau: quizFau,
                    quizPasRep: quizPasRep
                });
            }

            console.log(data);
            res.status(200).json(data);

        } else { return res.status(404).send('nothing found !') }
    } catch (error) {
        console.log(error.message)
    }
}
//@ desc get quiz stat
//@route HET /api/stat/quiz/time/module/annee/:module/:time/:annee
//@access privet
const GetQuizStatByModuleAndTimeAndAnnee = async (req, res) => {
    try {
        const { time, module, annee } = req.params
        const quiz = await Quiz.find()
        if (!quiz) {
            return res.status(400).send('0')
        }
        if (time == 'jour') {
            const modules = await Quiz.findOne({ module: module })
            if (!modules) {
                const today = new Date();
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - 6);

                const data = [];
                const dayCount = 7;

                for (let i = 0; i < dayCount; i++) {
                    const date = new Date(weekStart);
                    date.setDate(date.getDate() + i);

                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    let quizCorrect = 0;
                    let quizFau = 0;
                    let quizPasRep = 0;

                    data.push({
                        date: dateString,
                        quizCorrect: quizCorrect,
                        quizFau: quizFau,
                        quizPasRep: quizPasRep
                    });
                }
                return res.status(200).json(data)
            }
            const anne = await Quiz.findOne({ anneeScol: annee })
            if (!anne) {
                const today = new Date();
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - 6);

                const data = [];
                const dayCount = 7;

                for (let i = 0; i < dayCount; i++) {
                    const date = new Date(weekStart);
                    date.setDate(date.getDate() + i);

                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    let quizCorrect = 0;
                    let quizFau = 0;
                    let quizPasRep = 0;

                    data.push({
                        date: dateString,
                        quizCorrect: quizCorrect,
                        quizFau: quizFau,
                        quizPasRep: quizPasRep
                    });
                }
                return res.status(200).json(data)
            }
            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - 6);

            const data = [];
            const dayCount = 7;

            for (let i = 0; i < dayCount; i++) {
                const date = new Date(weekStart);
                date.setDate(date.getDate() + i);

                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear().toString();
                const dateString = `${day}/${month}/${year}`;
                const quizDocs = await Quiz.find({ user: req.user.id, anneeScol: annee, module: module, date: dateString });
                let quizCorrect = 0;
                let quizFau = 0;
                let quizPasRep = 0;

                quizDocs.forEach((doc) => {
                    const qs = doc.questions;
                    qs.forEach((q) => {
                        if (q.qs.corection === "true") {
                            quizCorrect++;
                        } else if (q.qs.corection === "false") {
                            quizFau++;
                        } else {
                            quizPasRep++;
                        }
                    });
                });

                data.push({
                    date: dateString,
                    quizCorrect: quizCorrect,
                    quizFau: quizFau,
                    quizPasRep: quizPasRep
                });
            }



            console.log(data)
            res.status(200).json(data)
        } else if (time == 'semaine') {
            const modules = await Quiz.findOne({ module: module })
            if (!modules) {
                const today = new Date();
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                const weekStart = new Date(monthStart);

                const data = [];
                const weekCount = 4;

                for (let i = 0; i < weekCount; i++) {
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 7);

                    const weekNum = i + 1;
                    const weekString = `semaine ${weekNum}`;

                    let quizCorrect = 0;
                    let quizFau = 0;
                    let quizPasRep = 0;

                    for (let j = 0; j < 6; j++) {
                        const date = new Date(weekStart);
                        date.setDate(weekStart.getDate() + j);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const year = date.getFullYear().toString();
                        const dateString = `${day}/${month}/${year}`;
                    }

                    data.push({
                        date: weekString,
                        quizCorrect: quizCorrect,
                        quizFau: quizFau,
                        quizPasRep: quizPasRep,
                    });

                    weekStart.setDate(weekEnd.getDate() + 1);
                }
                return res.status(200).json(data)
            }
            const anne = await Quiz.findOne({ anneeScol: annee })
            if (!anne) {
                const today = new Date();
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                const weekStart = new Date(monthStart);

                const data = [];
                const weekCount = 4;

                for (let i = 0; i < weekCount; i++) {
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 7);

                    const weekNum = i + 1;
                    const weekString = `semaine ${weekNum}`;

                    let quizCorrect = 0;
                    let quizFau = 0;
                    let quizPasRep = 0;

                    for (let j = 0; j < 6; j++) {
                        const date = new Date(weekStart);
                        date.setDate(weekStart.getDate() + j);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const year = date.getFullYear().toString();
                        const dateString = `${day}/${month}/${year}`;
                    }

                    data.push({
                        date: weekString,
                        quizCorrect: quizCorrect,
                        quizFau: quizFau,
                        quizPasRep: quizPasRep,
                    });

                    weekStart.setDate(weekEnd.getDate() + 1);
                }
                return res.status(200).json(data)
            }
            const today = new Date();
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            const weekStart = new Date(monthStart);

            const data = [];
            const weekCount = 4;

            for (let i = 0; i < weekCount; i++) {
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 7);

                const weekNum = i + 1;
                const weekString = `semaine ${weekNum}`;

                let quizCorrect = 0;
                let quizFau = 0;
                let quizPasRep = 0;

                for (let j = 0; j < 6; j++) {
                    const date = new Date(weekStart);
                    date.setDate(weekStart.getDate() + j);
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    const quizDocs = await Quiz.find({ user: req.user.id, anneeScol: annee, module: module, date: dateString });

                    quizDocs.forEach((doc) => {
                        const qs = doc.questions;
                        qs.forEach((q) => {
                            if (q.qs.corection === "true") {
                                quizCorrect++;
                            } else if (q.qs.corection === "false") {
                                quizFau++;
                            } else {
                                quizPasRep++;
                            }
                        });
                    });
                }

                data.push({
                    date: weekString,
                    quizCorrect: quizCorrect,
                    quizFau: quizFau,
                    quizPasRep: quizPasRep,
                });

                weekStart.setDate(weekEnd.getDate() + 1);
            }

            console.log(data);
            res.status(200).json(data);

        } else if (time == 'mois') {
            const modules = await Quiz.findOne({ module: module })
            if (!modules) {
                const today = new Date();
                const yearStart = new Date(today.getFullYear(), 0, 1);

                const data = [];
                const monthCount = 12;

                for (let i = 0; i < monthCount; i++) {
                    const date = new Date(yearStart);
                    date.setMonth(date.getMonth() + i);

                    const monthIndex = date.getMonth();
                    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
                    const year = date.getFullYear().toString();
                    const monthString = `${monthIndex + 1}/${year}`;
                    let quizCorrect = 0;
                    let quizFau = 0;
                    let quizPasRep = 0;

                    data.push({
                        date: monthName,
                        quizCorrect: quizCorrect,
                        quizFau: quizFau,
                        quizPasRep: quizPasRep
                    });
                }
                return res.status(200).json(data)
            }
            const anne = await Quiz.findOne({ anneeScol: annee })
            if (!anne) {
                const today = new Date();
                const yearStart = new Date(today.getFullYear(), 0, 1);

                const data = [];
                const monthCount = 12;

                for (let i = 0; i < monthCount; i++) {
                    const date = new Date(yearStart);
                    date.setMonth(date.getMonth() + i);

                    const monthIndex = date.getMonth();
                    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
                    const year = date.getFullYear().toString();
                    const monthString = `${monthIndex + 1}/${year}`;
                    let quizCorrect = 0;
                    let quizFau = 0;
                    let quizPasRep = 0;

                    data.push({
                        date: monthName,
                        quizCorrect: quizCorrect,
                        quizFau: quizFau,
                        quizPasRep: quizPasRep
                    });
                }
                return res.status(200).json(data)
            }
            const today = new Date();
            const yearStart = new Date(today.getFullYear(), 0, 1);

            const data = [];
            const monthCount = 12;

            for (let i = 0; i < monthCount; i++) {
                const date = new Date(yearStart);
                date.setMonth(date.getMonth() + i);

                const monthIndex = date.getMonth();
                const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
                const year = date.getFullYear().toString();
                const monthString = `${monthIndex + 1}/${year}`;
                const quizDocs = await Quiz.find({ user: req.user.id, anneeScol: annee, module: module, date: { $regex: `${monthString}/*` } });
                let quizCorrect = 0;
                let quizFau = 0;
                let quizPasRep = 0;

                quizDocs.forEach((doc) => {
                    const qs = doc.questions;
                    qs.forEach((q) => {
                        if (q.qs.corection === "true") {
                            quizCorrect++;
                        } else if (q.qs.corection === "false") {
                            quizFau++;
                        } else {
                            quizPasRep++;
                        }
                    });
                });

                data.push({
                    date: monthName,
                    quizCorrect: quizCorrect,
                    quizFau: quizFau,
                    quizPasRep: quizPasRep
                });
            }

            console.log(data);
            res.status(200).json(data);

        } else { return res.status(404).send('nothing found !') }
    } catch (error) {
        console.log(error.message)
    }
}
//---------------------------------------------------------------------------------
//@ desc get module stat
//@route HET /api/stat/module/time/:time
//@access privet
const GetModulesStatByTime = async (req, res) => {
    try {
        const { time } = req.params
        const module = await Modules.find()

        if (time == 'jour') {
            if (!module) {
                const today = new Date();
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - 6);

                const data = [];
                const dayCount = 7;

                for (let i = 0; i < dayCount; i++) {
                    const date = new Date(weekStart);
                    date.setDate(date.getDate() + i);

                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    const courCount = 0
                    const videoCount = 0
                    const audioCount = 0
                    data.push({
                        date: dateString,
                        cour: courCount,
                        video: videoCount,
                        audio: audioCount
                    });
                }
                res.status(200).json(data)
            }
            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - 6);

            const data = [];
            const dayCount = 7;

            for (let i = 0; i < dayCount; i++) {
                const date = new Date(weekStart);
                date.setDate(date.getDate() + i);

                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear().toString();
                const dateString = `${day}/${month}/${year}`;

                const courhistory = await History.findOne({ user: req.user.id, "cours.date": dateString });
                const courCount = courhistory ? courhistory.cours.filter(c => c.date === dateString).length : 0;
                const videohistory = await History.findOne({ user: req.user.id, "video.date": dateString });
                const videoCount = videohistory ? videohistory.video.filter(c => c.date === dateString).length : 0;
                const audiohistory = await History.findOne({ user: req.user.id, "audio.date": dateString });
                const audioCount = audiohistory ? audiohistory.audio.filter(c => c.date === dateString).length : 0;

                data.push({
                    date: dateString,
                    cour: courCount,
                    video: videoCount,
                    audio: audioCount
                });
            }
            res.status(200).json(data)
        } else if (time == 'semaine') {
            if (!module) {
                const today = new Date();
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                const weekStart = new Date(monthStart);

                const data = [];
                const weekCount = 4;

                for (let i = 0; i < weekCount; i++) {
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 7);

                    const weekNum = i + 1;
                    const weekString = `semaine ${weekNum}`;

                    let courWeekCount = 0;
                    let videoWeekCount = 0;
                    let audioWeekCount = 0;

                    for (let j = 0; j < 6; j++) {
                        const date = new Date(weekStart);
                        date.setDate(weekStart.getDate() + j);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const year = date.getFullYear().toString();
                        const dateString = `${day}/${month}/${year}`;
                    }

                    data.push({
                        date: weekString,
                        cour: courWeekCount,
                        video: videoWeekCount,
                        audio: audioWeekCount,
                    });

                    weekStart.setDate(weekEnd.getDate() + 1);
                }

                res.status(200).json(data);
            }
            const today = new Date();
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            const weekStart = new Date(monthStart);

            const data = [];
            const weekCount = 4;

            for (let i = 0; i < weekCount; i++) {
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 7);

                const weekNum = i + 1;
                const weekString = `semaine ${weekNum}`;

                let courWeekCount = 0;
                let videoWeekCount = 0;
                let audioWeekCount = 0;

                for (let j = 0; j < 6; j++) {
                    const date = new Date(weekStart);
                    date.setDate(weekStart.getDate() + j);
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;

                    const courhistory = await History.findOne({ user: req.user.id, "cours.date": dateString });
                    const courDayCount = courhistory ? courhistory.cours.filter(c => c.date === dateString).length : 0;
                    courWeekCount += courDayCount;

                    const videohistory = await History.findOne({ user: req.user.id, "video.date": dateString });
                    const videoDayCount = videohistory ? videohistory.video.filter(c => c.date === dateString).length : 0;
                    videoWeekCount += videoDayCount;

                    const audiohistory = await History.findOne({ user: req.user.id, "audio.date": dateString });
                    const audioDayCount = audiohistory ? audiohistory.audio.filter(c => c.date === dateString).length : 0;
                    audioWeekCount += audioDayCount;
                }

                data.push({
                    date: weekString,
                    cour: courWeekCount,
                    video: videoWeekCount,
                    audio: audioWeekCount,
                });

                weekStart.setDate(weekEnd.getDate() + 1);
            }


            console.log(data);
            res.status(200).json(data);
        } else if (time == 'mois') {
            if (!module) {
                const today = new Date();
                const yearStart = new Date(today.getFullYear(), 0, 1);

                const data = [];
                const monthCount = 12;

                for (let i = 0; i < monthCount; i++) {
                    const date = new Date(yearStart);
                    date.setMonth(date.getMonth() + i);

                    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

                    const courCount = 0;
                    const videoCount = 0;
                    const audioCount = 0;

                    const monthData = {
                        date: monthName,
                        cour: courCount,
                        video: videoCount,
                        audio: audioCount
                    };

                    data.push(monthData);
                }
                res.status(200).json(data);
            }
            const today = new Date();
            const yearStart = new Date(today.getFullYear(), 0, 1);

            const data = [];
            const monthCount = 12;

            for (let i = 0; i < monthCount; i++) {
                const date = new Date(yearStart);
                date.setMonth(date.getMonth() + i);

                const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

                const courCount = 0;
                const videoCount = 0;
                const audioCount = 0;

                const monthData = {
                    date: monthName,
                    cour: courCount,
                    video: videoCount,
                    audio: audioCount
                };

                data.push(monthData);
            }

            const history = await History.findOne({ user: req.user.id });
            if (history === null) {
                return res.status(400).send('0')
            }
            history.cours.forEach(course => {
                const courseDateParts = course.date.split('/');
                const courseDate = new Date(
                    parseInt(courseDateParts[2]), // year
                    parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                    parseInt(courseDateParts[0]) // day
                );
                const courseMonth = courseDate.getMonth();
                const courseYear = courseDate.getFullYear();
                const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(courseDate));
                if (monthData) {
                    monthData.cour += 1;
                }
            });


            history.video.forEach(video => {
                const courseDateParts = video.date.split('/');
                const videoDate = new Date(
                    parseInt(courseDateParts[2]), // year
                    parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                    parseInt(courseDateParts[0]) // day
                );
                const videoMonth = videoDate.getMonth();
                const videoYear = videoDate.getFullYear();
                const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(videoDate));
                if (monthData) {
                    monthData.video += 1;
                }
            });

            history.audio.forEach(audio => {
                const courseDateParts = audio.date.split('/');
                const audioDate = new Date(
                    parseInt(courseDateParts[2]), // year
                    parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                    parseInt(courseDateParts[0]) // day
                );
                const audioMonth = audioDate.getMonth();
                const audioYear = audioDate.getFullYear();
                const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(audioDate));
                if (monthData) {
                    monthData.audio += 1;
                }
            });


            console.log(data);
            res.status(200).json(data);
        } else { return res.status(404).send('nothing found !') }
    } catch (error) {
        console.log(error.message)
    }
}
//@ desc get module stat
//@route HET /api/stat/module/:module/:time
//@access privet
const GetModulesStatByModuleAndTime = async (req, res) => {
    try {
        const { time, module } = req.params
        const modules = await History.findOne({ "module.id": module })

        if (time == 'jour') {
            if (!modules) {
                const today = new Date();
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - 6);

                const data = [];
                const dayCount = 7;

                for (let i = 0; i < dayCount; i++) {
                    const date = new Date(weekStart);
                    date.setDate(date.getDate() + i);

                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;

                    const courCount = 0;
                    const videoCount = 0;
                    const audioCount = 0;

                    data.push({
                        date: dateString,
                        cour: courCount,
                        video: videoCount,
                        audio: audioCount
                    });
                }

                res.status(200).json(data)
            }
            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - 6);

            const data = [];
            const dayCount = 7;

            for (let i = 0; i < dayCount; i++) {
                const date = new Date(weekStart);
                date.setDate(date.getDate() + i);

                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear().toString();
                const dateString = `${day}/${month}/${year}`;

                const courhistory = await History.findOne({ user: req.user.id, "cours.module": module, "cours.date": dateString });
                const courCount = courhistory ? courhistory.cours.filter(c => c.date === dateString && c.module === module).length : 0;
                const videohistory = await History.findOne({ user: req.user.id, "video.module": module, "video.date": dateString });
                const videoCount = videohistory ? videohistory.video.filter(c => c.date === dateString && c.module === module).length : 0;
                const audiohistory = await History.findOne({ user: req.user.id, "audio.module": module, "audio.date": dateString });
                const audioCount = audiohistory ? audiohistory.audio.filter(c => c.date === dateString && c.module === module).length : 0;

                data.push({
                    date: dateString,
                    cour: courCount,
                    video: videoCount,
                    audio: audioCount
                });
            }
            console.log(data)
            res.status(200).json(data)
        } else if (time == 'semaine') {
            if (!modules) {
                const today = new Date();
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                const weekStart = new Date(monthStart);

                const data = [];
                const weekCount = 4;

                for (let i = 0; i < weekCount; i++) {
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 7);

                    const weekNum = i + 1;
                    const weekString = `semaine ${weekNum}`;

                    let courWeekCount = 0;
                    let videoWeekCount = 0;
                    let audioWeekCount = 0;

                    for (let j = 0; j < 6; j++) {
                        const date = new Date(weekStart);
                        date.setDate(weekStart.getDate() + j);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const year = date.getFullYear().toString();
                        const dateString = `${day}/${month}/${year}`;
                    }

                    data.push({
                        date: weekString,
                        cour: courWeekCount,
                        video: videoWeekCount,
                        audio: audioWeekCount,
                    });

                    weekStart.setDate(weekEnd.getDate() + 1);
                }

                res.status(200).json(data);
            }
            const today = new Date();
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            const weekStart = new Date(monthStart);

            const data = [];
            const weekCount = 4;

            for (let i = 0; i < weekCount; i++) {
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 7);

                const weekNum = i + 1;
                const weekString = `semaine ${weekNum}`;

                let courWeekCount = 0;
                let videoWeekCount = 0;
                let audioWeekCount = 0;

                for (let j = 0; j < 7; j++) {
                    const date = new Date(weekStart);
                    date.setDate(weekStart.getDate() + j);
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;

                    const courhistory = await History.findOne({ user: req.user.id, "cours.module": module, "cours.date": dateString });
                    const courDayCount = courhistory ? courhistory.cours.filter(c => c.date === dateString && c.module === module).length : 0;
                    courWeekCount += courDayCount;

                    const videohistory = await History.findOne({ user: req.user.id, "video.module": module, "video.date": dateString });
                    const videoDayCount = videohistory ? videohistory.video.filter(c => c.date === dateString && c.module === module).length : 0;
                    videoWeekCount += videoDayCount;

                    const audiohistory = await History.findOne({ user: req.user.id, "audio.module": module, "audio.date": dateString });
                    const audioDayCount = audiohistory ? audiohistory.audio.filter(c => c.date === dateString && c.module === module).length : 0;
                    audioWeekCount += audioDayCount;
                }

                data.push({
                    date: weekString,
                    cour: courWeekCount,
                    video: videoWeekCount,
                    audio: audioWeekCount,
                });

                weekStart.setDate(weekEnd.getDate() + 1);
            }


            console.log(data);
            res.status(200).json(data);
        } else if (time == 'mois') {
            if (!modules) {
                const today = new Date();
                const yearStart = new Date(today.getFullYear(), 0, 1);

                const data = [];
                const monthCount = 12;

                for (let i = 0; i < monthCount; i++) {
                    const date = new Date(yearStart);
                    date.setMonth(date.getMonth() + i);

                    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

                    const courCount = 0;
                    const videoCount = 0;
                    const audioCount = 0;

                    const monthData = {
                        date: monthName,
                        cour: courCount,
                        video: videoCount,
                        audio: audioCount
                    };

                    data.push(monthData);
                }
                res.status(200).json(data);
            }
            const today = new Date();
            const yearStart = new Date(today.getFullYear(), 0, 1);

            const data = [];
            const monthCount = 12;

            for (let i = 0; i < monthCount; i++) {
                const date = new Date(yearStart);
                date.setMonth(date.getMonth() + i);

                const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

                const courCount = 0;
                const videoCount = 0;
                const audioCount = 0;

                const monthData = {
                    date: monthName,
                    cour: courCount,
                    video: videoCount,
                    audio: audioCount
                };

                data.push(monthData);
            }

            const history = await History.findOne({ user: req.user.id });
            if (history === null) {
                return res.status(400).send('0')
            }
            history.cours.filter(item => item.module === module).forEach(course => {
                const courseDateParts = course.date.split('/');
                const courseDate = new Date(
                    parseInt(courseDateParts[2]), // year
                    parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                    parseInt(courseDateParts[0]) // day
                );
                const courseMonth = courseDate.getMonth();
                const courseYear = courseDate.getFullYear();
                const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(courseDate));
                if (monthData) {
                    monthData.cour += 1;
                }
            });


            history.video.filter(item => item.module === module).forEach(video => {
                const courseDateParts = video.date.split('/');
                const videoDate = new Date(
                    parseInt(courseDateParts[2]), // year
                    parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                    parseInt(courseDateParts[0]) // day
                );
                const videoMonth = videoDate.getMonth();
                const videoYear = videoDate.getFullYear();
                const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(videoDate));
                if (monthData) {
                    monthData.video += 1;
                }
            });

            history.audio.filter(item => item.module === module).forEach(audio => {
                const courseDateParts = audio.date.split('/');
                const audioDate = new Date(
                    parseInt(courseDateParts[2]), // year
                    parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                    parseInt(courseDateParts[0]) // day
                );
                const audioMonth = audioDate.getMonth();
                const audioYear = audioDate.getFullYear();
                const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(audioDate));
                if (monthData) {
                    monthData.audio += 1;
                }
            });


            console.log(data);
            res.status(200).json(data);
        } else { return res.status(404).send('nothing found !') }
    } catch (error) {
        console.log(error.message)
    }
}
//@ desc get module stat
//@route HET /api/stat/modules/time/annee/:module/:time/:annee
//@access privet
const GetModulesStatByModuleAndTimeAndAnnee = async (req, res) => {
    try {
        const { time, module, annee } = req.params

        const modules = await History.findOne({ "module.id": module })
        const modulesaa = await History.findOne({ "module.annee": annee })
        if (time == 'jour') {
            if (!modules) {
                const today = new Date();
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - 6);

                const data = [];
                const dayCount = 7;

                for (let i = 0; i < dayCount; i++) {
                    const date = new Date(weekStart);
                    date.setDate(date.getDate() + i);

                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;

                    const courCount = 0
                    const videoCount = 0
                    const audioCount = 0

                    data.push({
                        date: dateString,
                        cour: courCount,
                        video: videoCount,
                        audio: audioCount
                    });
                }
                res.status(200).json(data)
            }
            if (!modulesaa) {
                const today = new Date();
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - 6);

                const data = [];
                const dayCount = 7;

                for (let i = 0; i < dayCount; i++) {
                    const date = new Date(weekStart);
                    date.setDate(date.getDate() + i);

                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;

                    const courCount = 0
                    const videoCount = 0
                    const audioCount = 0

                    data.push({
                        date: dateString,
                        cour: courCount,
                        video: videoCount,
                        audio: audioCount
                    });
                }
                res.status(200).json(data)
            }
            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - 6);

            const data = [];
            const dayCount = 7;

            for (let i = 0; i < dayCount; i++) {
                const date = new Date(weekStart);
                date.setDate(date.getDate() + i);

                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear().toString();
                const dateString = `${day}/${month}/${year}`;

                const courhistory = await History.findOne({ user: req.user.id, "cours.module": module, "cours.annee": annee, "cours.date": dateString });
                const courCount = courhistory ? courhistory.cours.filter(c => c.date === dateString && c.annee === annee && c.module === module).length : 0;
                const videohistory = await History.findOne({ user: req.user.id, "video.module": module, "video.annee": annee, "video.date": dateString });
                const videoCount = videohistory ? videohistory.video.filter(c => c.date === dateString && c.annee === annee && c.module === module).length : 0;
                const audiohistory = await History.findOne({ user: req.user.id, "audio.module": module, "audio.annee": annee, "audio.date": dateString });
                const audioCount = audiohistory ? audiohistory.audio.filter(c => c.date === dateString && c.annee === annee && c.module === module).length : 0;

                data.push({
                    date: dateString,
                    cour: courCount,
                    video: videoCount,
                    audio: audioCount
                });
            }
            res.status(200).json(data)
        } else if (time == 'semaine') {
            if (!modules) {
                const today = new Date();
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                const weekStart = new Date(monthStart);

                const data = [];
                const weekCount = 4;

                for (let i = 0; i < weekCount; i++) {
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 7);

                    const weekNum = i + 1;
                    const weekString = `semaine ${weekNum}`;

                    let courWeekCount = 0;
                    let videoWeekCount = 0;
                    let audioWeekCount = 0;

                    for (let j = 0; j < 6; j++) {
                        const date = new Date(weekStart);
                        date.setDate(weekStart.getDate() + j);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const year = date.getFullYear().toString();
                        const dateString = `${day}/${month}/${year}`;
                    }

                    data.push({
                        date: weekString,
                        cour: courWeekCount,
                        video: videoWeekCount,
                        audio: audioWeekCount,
                    });

                    weekStart.setDate(weekEnd.getDate() + 1);
                }

                res.status(200).json(data);
            }
            if (!modulesaa) {
                const today = new Date();
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                const weekStart = new Date(monthStart);

                const data = [];
                const weekCount = 4;

                for (let i = 0; i < weekCount; i++) {
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 7);

                    const weekNum = i + 1;
                    const weekString = `semaine ${weekNum}`;

                    let courWeekCount = 0;
                    let videoWeekCount = 0;
                    let audioWeekCount = 0;

                    for (let j = 0; j < 6; j++) {
                        const date = new Date(weekStart);
                        date.setDate(weekStart.getDate() + j);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const year = date.getFullYear().toString();
                        const dateString = `${day}/${month}/${year}`;
                    }

                    data.push({
                        date: weekString,
                        cour: courWeekCount,
                        video: videoWeekCount,
                        audio: audioWeekCount,
                    });

                    weekStart.setDate(weekEnd.getDate() + 1);
                }

                res.status(200).json(data);
            }
            const today = new Date();
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            const weekStart = new Date(monthStart);

            const data = [];
            const weekCount = 4;

            for (let i = 0; i < weekCount; i++) {
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 7);

                const weekNum = i + 1;
                const weekString = `semaine ${weekNum}`;

                let courWeekCount = 0;
                let videoWeekCount = 0;
                let audioWeekCount = 0;

                for (let j = 0; j < 7; j++) {
                    const date = new Date(weekStart);
                    date.setDate(weekStart.getDate() + j);
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;

                    const courhistory = await History.findOne({ user: req.user.id, "cours.module": module, "cours.annee": annee, "cours.date": dateString });
                    const courDayCount = courhistory ? courhistory.cours.filter(c => c.date === dateString && c.annee === annee && c.module === module).length : 0;
                    courWeekCount += courDayCount;

                    const videohistory = await History.findOne({ user: req.user.id, "video.module": module, "video.annee": annee, "video.date": dateString });
                    const videoDayCount = videohistory ? videohistory.video.filter(c => c.date === dateString && c.annee === annee && c.module === module).length : 0;
                    videoWeekCount += videoDayCount;

                    const audiohistory = await History.findOne({ user: req.user.id, "audio.module": module, "audio.annee": annee, "audio.date": dateString });
                    const audioDayCount = audiohistory ? audiohistory.audio.filter(c => c.date === dateString && c.annee === annee && c.module === module).length : 0;
                    audioWeekCount += audioDayCount;
                }

                data.push({
                    date: weekString,
                    cour: courWeekCount,
                    video: videoWeekCount,
                    audio: audioWeekCount,
                });

                weekStart.setDate(weekEnd.getDate() + 1);
            }


            console.log(data);
            res.status(200).json(data);
        } else if (time == 'mois') {
            if (!modules) {
                const today = new Date();
                const yearStart = new Date(today.getFullYear(), 0, 1);

                const data = [];
                const monthCount = 12;

                for (let i = 0; i < monthCount; i++) {
                    const date = new Date(yearStart);
                    date.setMonth(date.getMonth() + i);

                    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

                    const courCount = 0;
                    const videoCount = 0;
                    const audioCount = 0;

                    const monthData = {
                        date: monthName,
                        cour: courCount,
                        video: videoCount,
                        audio: audioCount
                    };

                    data.push(monthData);
                }
                res.status(200).json(data);
            }
            if (!modulesaa) {
                const today = new Date();
                const yearStart = new Date(today.getFullYear(), 0, 1);

                const data = [];
                const monthCount = 12;

                for (let i = 0; i < monthCount; i++) {
                    const date = new Date(yearStart);
                    date.setMonth(date.getMonth() + i);

                    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

                    const courCount = 0;
                    const videoCount = 0;
                    const audioCount = 0;

                    const monthData = {
                        date: monthName,
                        cour: courCount,
                        video: videoCount,
                        audio: audioCount
                    };

                    data.push(monthData);
                }
                res.status(200).json(data);
            }
            const today = new Date();
            const yearStart = new Date(today.getFullYear(), 0, 1);

            const data = [];
            const monthCount = 12;

            for (let i = 0; i < monthCount; i++) {
                const date = new Date(yearStart);
                date.setMonth(date.getMonth() + i);

                const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

                const courCount = 0;
                const videoCount = 0;
                const audioCount = 0;

                const monthData = {
                    date: monthName,
                    cour: courCount,
                    video: videoCount,
                    audio: audioCount
                };

                data.push(monthData);
            }

            const history = await History.findOne({ user: req.user.id });
            if (history === null) {
                return res.status(400).send('0')
            }
            history.cours.filter(item => item.module === module && item.annee === annee).forEach(course => {
                const courseDateParts = course.date.split('/');
                const courseDate = new Date(
                    parseInt(courseDateParts[2]), // year
                    parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                    parseInt(courseDateParts[0]) // day
                );
                const courseMonth = courseDate.getMonth();
                const courseYear = courseDate.getFullYear();
                const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(courseDate));
                if (monthData) {
                    monthData.cour += 1;
                }
            });


            history.video.filter(item => item.module === module && item.annee === annee).forEach(video => {
                const courseDateParts = video.date.split('/');
                const videoDate = new Date(
                    parseInt(courseDateParts[2]), // year
                    parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                    parseInt(courseDateParts[0]) // day
                );
                const videoMonth = videoDate.getMonth();
                const videoYear = videoDate.getFullYear();
                const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(videoDate));
                if (monthData) {
                    monthData.video += 1;
                }
            });

            history.audio.filter(item => item.module === module && item.annee === annee).forEach(audio => {
                const courseDateParts = audio.date.split('/');
                const audioDate = new Date(
                    parseInt(courseDateParts[2]), // year
                    parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                    parseInt(courseDateParts[0]) // day
                );
                const audioMonth = audioDate.getMonth();
                const audioYear = audioDate.getFullYear();
                const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(audioDate));
                if (monthData) {
                    monthData.audio += 1;
                }
            });


            console.log(data);
            res.status(200).json(data);
        } else { return res.status(404).send('nothing found !') }
    } catch (error) {
        console.log(error.message)
    }
}
//@ desc get module stat
//@route HET /api/stat/modules/time/annee/:time/:annee
//@access privet
const GetModulesStatByModuleAndAnnee = async (req, res) => {
    try {
        const { time, annee } = req.params
        const modules = await History.findOne({ "module.annee": annee })

        if (time == 'jour') {
            if (!modules) {
                const today = new Date();
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - 6);

                const data = [];
                const dayCount = 7;

                for (let i = 0; i < dayCount; i++) {
                    const date = new Date(weekStart);
                    date.setDate(date.getDate() + i);

                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    const courCount = 0
                    const videoCount = 0
                    const audioCount = 0
                    data.push({
                        date: dateString,
                        cour: courCount,
                        video: videoCount,
                        audio: audioCount
                    });
                }
                res.status(200).json(data)
            }
            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - 6);

            const data = [];
            const dayCount = 7;

            for (let i = 0; i < dayCount; i++) {
                const date = new Date(weekStart);
                date.setDate(date.getDate() + i);

                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear().toString();
                const dateString = `${day}/${month}/${year}`;

                const courhistory = await History.findOne({ user: req.user.id, "cours.annee": annee, "cours.date": dateString });
                const courCount = courhistory ? courhistory.cours.filter(c => c.date === dateString && c.annee === annee).length : 0;
                const videohistory = await History.findOne({ user: req.user.id, "video.annee": annee, "video.date": dateString });
                const videoCount = videohistory ? videohistory.video.filter(c => c.date === dateString && c.annee === annee).length : 0;
                const audiohistory = await History.findOne({ user: req.user.id, "audio.annee": annee, "audio.date": dateString });
                const audioCount = audiohistory ? audiohistory.audio.filter(c => c.date === dateString && c.annee === annee).length : 0;

                data.push({
                    date: dateString,
                    cour: courCount,
                    video: videoCount,
                    audio: audioCount
                });
            }
            res.status(200).json(data)
        } else if (time == 'semaine') {
            if (!modules) {
                const today = new Date();
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                const weekStart = new Date(monthStart);

                const data = [];
                const weekCount = 4;

                for (let i = 0; i < weekCount; i++) {
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 7);

                    const weekNum = i + 1;
                    const weekString = `semaine ${weekNum}`;

                    let courWeekCount = 0;
                    let videoWeekCount = 0;
                    let audioWeekCount = 0;

                    for (let j = 0; j < 6; j++) {
                        const date = new Date(weekStart);
                        date.setDate(weekStart.getDate() + j);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const year = date.getFullYear().toString();
                        const dateString = `${day}/${month}/${year}`;
                    }

                    data.push({
                        date: weekString,
                        cour: courWeekCount,
                        video: videoWeekCount,
                        audio: audioWeekCount,
                    });

                    weekStart.setDate(weekEnd.getDate() + 1);
                }

                res.status(200).json(data);
            }
            const today = new Date();
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            const weekStart = new Date(monthStart);

            const data = [];
            const weekCount = 4;

            for (let i = 0; i < weekCount; i++) {
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 7);

                const weekNum = i + 1;
                const weekString = `semaine ${weekNum}`;

                let courWeekCount = 0;
                let videoWeekCount = 0;
                let audioWeekCount = 0;

                for (let j = 0; j < 7; j++) {
                    const date = new Date(weekStart);
                    date.setDate(weekStart.getDate() + j);
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;

                    const courhistory = await History.findOne({ user: req.user.id, "cours.annee": annee, "cours.date": dateString });
                    const courDayCount = courhistory ? courhistory.cours.filter(c => c.date === dateString && c.annee === annee).length : 0;
                    courWeekCount += courDayCount;

                    const videohistory = await History.findOne({ user: req.user.id, "video.annee": annee, "video.date": dateString });
                    const videoDayCount = videohistory ? videohistory.video.filter(c => c.date === dateString && c.annee === annee).length : 0;
                    videoWeekCount += videoDayCount;

                    const audiohistory = await History.findOne({ user: req.user.id, "audio.annee": annee, "audio.date": dateString });
                    const audioDayCount = audiohistory ? audiohistory.audio.filter(c => c.date === dateString && c.annee === annee).length : 0;
                    audioWeekCount += audioDayCount;
                }

                data.push({
                    date: weekString,
                    cour: courWeekCount,
                    video: videoWeekCount,
                    audio: audioWeekCount,
                });

                weekStart.setDate(weekEnd.getDate() + 1);
            }


            console.log(data);
            res.status(200).json(data);
        } else if (time == 'mois') {
            if (!modules) {
                const today = new Date();
                const yearStart = new Date(today.getFullYear(), 0, 1);

                const data = [];
                const monthCount = 12;

                for (let i = 0; i < monthCount; i++) {
                    const date = new Date(yearStart);
                    date.setMonth(date.getMonth() + i);

                    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

                    const courCount = 0;
                    const videoCount = 0;
                    const audioCount = 0;

                    const monthData = {
                        date: monthName,
                        cour: courCount,
                        video: videoCount,
                        audio: audioCount
                    };

                    data.push(monthData);
                }
                res.status(200).json(data);
            }
            const today = new Date();
            const yearStart = new Date(today.getFullYear(), 0, 1);

            const data = [];
            const monthCount = 12;

            for (let i = 0; i < monthCount; i++) {
                const date = new Date(yearStart);
                date.setMonth(date.getMonth() + i);

                const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

                const courCount = 0;
                const videoCount = 0;
                const audioCount = 0;

                const monthData = {
                    date: monthName,
                    cour: courCount,
                    video: videoCount,
                    audio: audioCount
                };

                data.push(monthData);
            }

            const history = await History.findOne({ user: req.user.id });
            if (history === null) {
                return res.status(400).send('0')
            }
            history.cours.filter(item => item.annee === annee).forEach(course => {
                const courseDateParts = course.date.split('/');
                const courseDate = new Date(
                    parseInt(courseDateParts[2]), // year
                    parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                    parseInt(courseDateParts[0]) // day
                );
                const courseMonth = courseDate.getMonth();
                const courseYear = courseDate.getFullYear();
                const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(courseDate));
                if (monthData) {
                    monthData.cour += 1;
                }
            });


            history.video.filter(item => item.annee === annee).forEach(video => {
                const courseDateParts = video.date.split('/');
                const videoDate = new Date(
                    parseInt(courseDateParts[2]), // year
                    parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                    parseInt(courseDateParts[0]) // day
                );
                const videoMonth = videoDate.getMonth();
                const videoYear = videoDate.getFullYear();
                const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(videoDate));
                if (monthData) {
                    monthData.video += 1;
                }
            });

            history.audio.filter(item => item.annee === annee).forEach(audio => {
                const courseDateParts = audio.date.split('/');
                const audioDate = new Date(
                    parseInt(courseDateParts[2]), // year
                    parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                    parseInt(courseDateParts[0]) // day
                );
                const audioMonth = audioDate.getMonth();
                const audioYear = audioDate.getFullYear();
                const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(audioDate));
                if (monthData) {
                    monthData.audio += 1;
                }
            });


            console.log(data);
            res.status(200).json(data);
        } else { return res.status(404).send('nothing found !') }
    } catch (error) {
        console.log(error.message)
    }
}
//-----------------------------------------------------------------------
const adminGeneralStat = async (req, res) => {
    try {
        const users = await User.find()
        const modules = await Modules.find()
        const annee = await Annee.find()
        const cour = await Coure.find()
        const sujet = await Sujet.find()
        console.log('users.filter(item => item.isAdmin !== true)');
        console.log(users.filter(item => item.isAdmin !== true));
        res.status(200).json({
            user: users !== null ? users.filter(item => item.isAdmin !== true && item.del !== 1).length : 0,
            module: modules !== null ? modules.filter(item => item.del != '1').length : 0,
            annee: annee !== null ? annee.filter(item => item.del != '1').length : 0,
            cour: cour !== null ? cour.filter(item => item.del != '1').length : 0,
            quiz: sujet !== null ? sujet.filter(item => item.del != '1').length : 0,
        })
    } catch (error) {
        console.log(error.message)

    }
}
const adminUserStat = async (req, res) => {
    try {
        const visit = await Visit.find()
        const users = await User.find()
        const newAbb = users.filter(usr => {

            const date1 = moment(usr.Debut);
            const date2 = moment();

            const diffInDays = date2.diff(date1, 'days');
            console.log('diffInDays debut' + usr.email);
            console.log(diffInDays);
            return diffInDays < 7 && usr.isAdmin !== true && usr.del !== 1
        }).length



        const endAbb = users.filter(usr => {
            const date1 = moment(usr.Fin);
            const date2 = moment();

            const diffInDays = date2.diff(date1, 'days');
            console.log('diffInDays' + usr.email);
            console.log(diffInDays);

            return diffInDays >= 0 && diffInDays < 7 && usr.isAdmin !== true && usr.Fin !== null && usr.del !== 1
        }).length


        res.status(200).json({
            visit: visit !== null ? visit.length : 0,
            newAbb: newAbb !== null ? newAbb : 0,
            endAbb: endAbb !== null ? endAbb : 0
        })
    } catch (error) {
        console.log(error.message)
    }
}
const adminTraficChart = async (req, res) => {
    try {
        // const { time } = req.params
        const time = 'jour';
        const visit = await Visit.find()
        if (time == 'jour') {
            if (!visit) {
                const today = new Date();
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - 6);

                const data = [];
                const dayCount = 7;

                for (let i = 0; i < dayCount; i++) {
                    const date = new Date(weekStart);
                    date.setDate(date.getDate() + i);

                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;

                    let visitor = 0;

                    data.push({
                        date: dateString,
                        visitor: visitor,
                    });
                }
                res.status(200).json(data)
            }
            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - 6);

            const data = [];
            const dayCount = 7;

            for (let i = 0; i < dayCount; i++) {
                const date = new Date(weekStart);
                date.setDate(date.getDate() + i);

                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear().toString();
                const dateString = `${day}/${month}/${year}`;
                const visitors = await Visit.find({ date: dateString });
                let visitor = 0;

                visitors.forEach((vis) => {
                    visitor++;
                });

                data.push({
                    date: dateString,
                    visitor: visitor,
                });
            }

            console.log(data)
            res.status(200).json(data)
        } else { return res.status(404).send('nothing found !') }
    } catch (error) {
        console.log(error.message)
    }
}
const adminAbb = async (req, res) => {
    try {
        const abbon = await User.find()
        const abb = abbon.filter(usr => {

            const date1 = moment(usr.Debut);
           
            const date2 =  moment();

            console.log('date_d')
            console.log(date1)
            console.log('date_2')
            console.log(date2)

            const diffInDays = date2.diff(date1, 'days');
            console.log('diiffff')
            console.log(diffInDays)
            return diffInDays < 7 && usr.isAdmin !== true && usr.del !== 1
        })

        console.log('abb')
        console.log(abb)
        if (abb === null) {
            return res.status(400).send('no content to show !')
        }
        res.status(200).json(abb)
    } catch (error) {
        console.log(error.message)
    }
}
const adminUsersStatByTime = async (req, res) => {
    try {
        const { time } = req.params
        const usr = await User.find()
        if (time == 'jour') {
            if (!usr) {
                const today = new Date();
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - 6);

                const data = [];
                const dayCount = 7;

                for (let i = 0; i < dayCount; i++) {
                    const date = new Date(weekStart);
                    date.setDate(date.getDate() + i);

                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear().toString();
                    const dateString = cls;

                    let goldUser = 0;
                    let normalUser = 0;
                    let testUser = 0;

                    data.push({
                        date: dateString,
                        goldUser: goldUser,
                        normalUser: normalUser,
                        testUser: testUser
                    });
                }
                res.status(200).json(data)
            }
            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - 6);

            const data = [];
            const dayCount = 7;

            for (let i = 0; i < dayCount; i++) {
                const date = new Date(weekStart);
                date.setDate(date.getDate() + i);

                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear().toString();
                const dateString = `${day}-${month}-${year}`;
                const usrs = await User.find({ Debut: dateString });
                console.log(dateString)
                console.log(usrs)
                let goldUser = 0;
                let normalUser = 0;
                let testUser = 0;

                usrs.forEach((usr) => {
                    console.log(usr.gold)
                    if (usr.gold == "gold") {
                        console.log(usr.gold, usr.Debut)
                        console.log(dateString == usr.Debut)
                        goldUser++;
                    } else if (usr.gold == "normal") {
                        normalUser++;
                    } else if (usr.gold == "test") {
                        testUser++;
                    }
                });

                data.push({
                    date: dateString,
                    goldUser: goldUser,
                    normalUser: normalUser,
                    testUser: testUser
                });
            }

            console.log(data)
            res.status(200).json(data)
        } else if (time == 'semaine') {
            if (!usr) {
                const today = new Date();
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                const weekStart = new Date(monthStart);

                const data = [];
                const weekCount = 4;

                for (let i = 0; i < weekCount; i++) {
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 7);

                    const weekNum = i + 1;
                    const weekString = `semaine ${weekNum}`;

                    let goldUser = 0;
                    let normalUser = 0;
                    let testUser = 0;

                    for (let j = 0; j < 6; j++) {
                        const date = new Date(weekStart);
                        date.setDate(weekStart.getDate() + j);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const year = date.getFullYear().toString();
                        const dateString = `${day}/${month}/${year}`;
                    }

                    data.push({
                        date: weekString,
                        goldUser: goldUser,
                        normalUser: normalUser,
                        testUser: testUser,
                    });

                    weekStart.setDate(weekEnd.getDate() + 1);
                }

                res.status(200).json(data);
            }
            const today = new Date();
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            const weekStart = new Date(monthStart);

            const data = [];
            const weekCount = 4;

            for (let i = 0; i < weekCount; i++) {
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 7);

                const weekNum = i + 1;
                const weekString = `semaine ${weekNum}`;

                let goldUser = 0;
                let normalUser = 0;
                let testUser = 0;

                for (let j = 0; j < 7; j++) {
                    const date = new Date(weekStart);
                    date.setDate(weekStart.getDate() + j);
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    const user = await User.find({ Debut: dateString });

                    user.forEach((user) => {
                        if (user.gold === "gold") {
                            goldUser++;
                        } else if (user.gold === "normal") {
                            normalUser++;
                        } else if (user.gold === "test") {
                            testUser++;
                        }
                    });
                }

                data.push({
                    date: weekString,
                    goldUser: goldUser,
                    normalUser: normalUser,
                    testUser: testUser,
                });

                weekStart.setDate(weekEnd.getDate() + 1);
            }

            console.log(data);
            res.status(200).json(data);
        } else if (time == 'mois') {
            if (!usr) {
                const today = new Date();
                const yearStart = new Date(today.getFullYear(), 0, 1);

                const data = [];
                const monthCount = 12;

                for (let i = 0; i < monthCount; i++) {
                    const date = new Date(yearStart);
                    date.setMonth(date.getMonth() + i);

                    const monthIndex = date.getMonth();
                    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
                    const year = date.getFullYear().toString();
                    const monthString = `${monthIndex + 1}/${year}`;
                    let goldUser = 0;
                    let normalUser = 0;
                    let testUser = 0;

                    data.push({
                        date: monthName,
                        goldUser: goldUser,
                        normalUser: normalUser,
                        testUser: testUser,
                    });
                }

                res.status(200).json(data);
            }
            const today = new Date();
            const yearStart = new Date(today.getFullYear(), 0, 1);

            const data = [];
            const monthCount = 12;

            for (let i = 0; i < monthCount; i++) {
                const date = new Date(yearStart);
                date.setMonth(date.getMonth() + i);

                const monthIndex = date.getMonth();
                const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
                const year = date.getFullYear().toString();
                const monthString = `${monthIndex + 1}/${year}`;
                const user = await User.find({ Debut: { $regex: `${monthString}/*` } });
                let goldUser = 0;
                let normalUser = 0;
                let testUser = 0;

                user.forEach((user) => {
                    if (user.gold === "gold") {
                        goldUser++;
                    } else if (user.gold === "normal") {
                        normalUser++;
                    } else if (user.gold === "test") {
                        testUser++;
                    }
                });

                data.push({
                    date: monthName,
                    goldUser: goldUser,
                    normalUser: normalUser,
                    testUser: testUser,
                });
            }

            res.status(200).json(data);

        } else { return res.status(404).send('nothing found !') }
    } catch (error) {
        console.log(error.message)
    }
}
const adminUsersStatByTimeAndAnnee = async (req, res) => {
    try {
        const { time, annee } = req.params
        const Ann = await Annee.find({ annee: annee })
        console.log('Ann')
        console.log(Ann)
        if (time == 'jour') {
            if (!Ann) {
                const today = new Date();
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - 6);

                const data = [];
                const dayCount = 7;

                for (let i = 0; i < dayCount; i++) {
                    const date = new Date(weekStart);
                    date.setDate(date.getDate() + i);

                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;

                    let goldUser = 0;
                    let normalUser = 0;
                    let testUser = 0;

                    data.push({
                        date: dateString,
                        goldUser: goldUser,
                        normalUser: normalUser,
                        testUser: testUser
                    });
                }
                res.status(200).json(data)
            }
            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - 6);

            const data = [];
            const dayCount = 7;

            for (let i = 0; i < dayCount; i++) {
                const date = new Date(weekStart);
                date.setDate(date.getDate() + i);

                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear().toString();
                const dateString = `${day}/${month}/${year}`;
                const usrs = await User.find({ Debut: dateString, annee: annee });
                console.log('usrs')
                console.log(usrs)
                let goldUser = 0;
                let normalUser = 0;
                let testUser = 0;

                usrs.forEach((usr) => {
                    if (usr.gold == "gold") {
                        goldUser++;
                    } else if (usr.gold == "normal") {
                        normalUser++;
                    } else if (usr.gold == "test") {
                        testUser++;
                    }
                });

                data.push({
                    date: dateString,
                    goldUser: goldUser,
                    normalUser: normalUser,
                    testUser: testUser
                });
            }

            console.log(data)
            res.status(200).json(data)
        } else if (time == 'semaine') {
            if (!Ann) {
                const today = new Date();
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                const weekStart = new Date(monthStart);

                const data = [];
                const weekCount = 4;

                for (let i = 0; i < weekCount; i++) {
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 7);

                    const weekNum = i + 1;
                    const weekString = `semaine ${weekNum}`;

                    let goldUser = 0;
                    let normalUser = 0;
                    let testUser = 0;

                    for (let j = 0; j < 6; j++) {
                        const date = new Date(weekStart);
                        date.setDate(weekStart.getDate() + j);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const year = date.getFullYear().toString();
                        const dateString = `${day}/${month}/${year}`;
                    }

                    data.push({
                        date: weekString,
                        goldUser: goldUser,
                        normalUser: normalUser,
                        testUser: testUser,
                    });

                    weekStart.setDate(weekEnd.getDate() + 1);
                }

                res.status(200).json(data);
            }
            const today = new Date();
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            const weekStart = new Date(monthStart);

            const data = [];
            const weekCount = 4;

            for (let i = 0; i < weekCount; i++) {
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 7);

                const weekNum = i + 1;
                const weekString = `semaine ${weekNum}`;

                let goldUser = 0;
                let normalUser = 0;
                let testUser = 0;

                for (let j = 0; j < 7; j++) {
                    const date = new Date(weekStart);
                    date.setDate(weekStart.getDate() + j);
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    const user = await User.find({ Debut: dateString, annee: annee });

                    user.forEach((user) => {
                        if (user.gold === "gold") {
                            goldUser++;
                        } else if (user.gold === "normal") {
                            normalUser++;
                        } else if (user.gold === "test") {
                            testUser++;
                        }
                    });
                }

                data.push({
                    date: weekString,
                    goldUser: goldUser,
                    normalUser: normalUser,
                    testUser: testUser,
                });

                weekStart.setDate(weekEnd.getDate() + 1);
            }

            console.log(data);
            res.status(200).json(data);
        } else if (time == 'mois') {
            if (!Ann) {
                const today = new Date();
                const yearStart = new Date(today.getFullYear(), 0, 1);

                const data = [];
                const monthCount = 12;

                for (let i = 0; i < monthCount; i++) {
                    const date = new Date(yearStart);
                    date.setMonth(date.getMonth() + i);

                    const monthIndex = date.getMonth();
                    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
                    const year = date.getFullYear().toString();
                    const monthString = `${monthIndex + 1}/${year}`;
                    let goldUser = 0;
                    let normalUser = 0;
                    let testUser = 0;

                    data.push({
                        date: monthName,
                        goldUser: goldUser,
                        normalUser: normalUser,
                        testUser: testUser,
                    });
                }

                res.status(200).json(data);
            }
            const today = new Date();
            const yearStart = new Date(today.getFullYear(), 0, 1);

            const data = [];
            const monthCount = 12;

            for (let i = 0; i < monthCount; i++) {
                const date = new Date(yearStart);
                date.setMonth(date.getMonth() + i);

                const monthIndex = date.getMonth();
                const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
                const year = date.getFullYear().toString();
                const monthString = `${monthIndex + 1}/${year}`;
                const user = await User.find({ Debut: { $regex: `${monthString}/*` }, annee: annee });
                let goldUser = 0;
                let normalUser = 0;
                let testUser = 0;

                user.forEach((user) => {
                    if (user.gold === "gold") {
                        goldUser++;
                    } else if (user.gold === "normal") {
                        normalUser++;
                    } else if (user.gold === "test") {
                        testUser++;
                    }
                });

                data.push({
                    date: monthName,
                    goldUser: goldUser,
                    normalUser: normalUser,
                    testUser: testUser,
                });
            }

            res.status(200).json(data);

        } else { return res.status(404).send('nothing found !') }
    } catch (error) {
        console.log(error.message)
    }
}
const adminTraficStatByTime = async (req, res) => {
    try {
        const { time } = req.params
        const visit = await Visit.find()
        if (time == 'jour') {
            if (!visit) {
                const today = new Date();
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - 6);

                const data = [];
                const dayCount = 7;

                for (let i = 0; i < dayCount; i++) {
                    const date = new Date(weekStart);
                    date.setDate(date.getDate() + i);

                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;

                    let visitor = 0;

                    data.push({
                        date: dateString,
                        visitor: visitor,
                    });
                }
                res.status(200).json(data)
            }
            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - 6);

            const data = [];
            const dayCount = 7;

            for (let i = 0; i < dayCount; i++) {
                const date = new Date(weekStart);
                date.setDate(date.getDate() + i);

                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear().toString();
                const dateString = `${day}/${month}/${year}`;
                const visitors = await Visit.find({ date: dateString });
                let visitor = 0;

                visitors.forEach((vis) => {
                    visitor++;
                });

                data.push({
                    date: dateString,
                    visitor: visitor,
                });
            }

            console.log(data)
            res.status(200).json(data)
        } else if (time == 'semaine') {
            if (!visit) {
                const today = new Date();
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                const weekStart = new Date(monthStart);

                const data = [];
                const weekCount = 4;

                for (let i = 0; i < weekCount; i++) {
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 7);

                    const weekNum = i + 1;
                    const weekString = `semaine ${weekNum}`;

                    let visitor = 0;

                    for (let j = 0; j < 6; j++) {
                        const date = new Date(weekStart);
                        date.setDate(weekStart.getDate() + j);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const year = date.getFullYear().toString();
                        const dateString = `${day}/${month}/${year}`;
                    }

                    data.push({
                        date: weekString,
                        visitor: visitor,
                    });

                    weekStart.setDate(weekEnd.getDate() + 1);
                }

                res.status(200).json(data);
            }
            const today = new Date();
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            const weekStart = new Date(monthStart);

            const data = [];
            const weekCount = 4;

            for (let i = 0; i < weekCount; i++) {
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 7);

                const weekNum = i + 1;
                const weekString = `semaine ${weekNum}`;

                let visitor = 0;

                for (let j = 0; j < 7; j++) {
                    const date = new Date(weekStart);
                    date.setDate(weekStart.getDate() + j);
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    const visits = await Visit.find({ date: dateString });
                    visits.forEach((vis) => {
                        visitor++;
                    });
                }

                data.push({
                    date: weekString,
                    visitor: visitor,
                });

                weekStart.setDate(weekEnd.getDate() + 1);
            }

            console.log(data);
            res.status(200).json(data);
        } else if (time == 'mois') {
            if (!visit) {
                const today = new Date();
                const yearStart = new Date(today.getFullYear(), 0, 1);

                const data = [];
                const monthCount = 12;

                for (let i = 0; i < monthCount; i++) {
                    const date = new Date(yearStart);
                    date.setMonth(date.getMonth() + i);

                    const monthIndex = date.getMonth();
                    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
                    const year = date.getFullYear().toString();
                    const monthString = `${monthIndex + 1}/${year}`;
                    let visitor = 0;

                    data.push({
                        date: monthName,
                        visitor: visitor,
                    });
                }

                res.status(200).json(data);
            }
            const today = new Date();
            const yearStart = new Date(today.getFullYear(), 0, 1);

            const data = [];
            const monthCount = 12;

            for (let i = 0; i < monthCount; i++) {
                const date = new Date(yearStart);
                date.setMonth(date.getMonth() + i);

                const monthIndex = date.getMonth();
                const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
                const year = date.getFullYear().toString();
                const monthString = `${monthIndex + 1}/${year}`;
                const visits = await Visit.find({ date: { $regex: `${monthString}/*` } });
                let visitor = 0;


                visits.forEach((visit) => {
                    visitor++;
                });

                data.push({
                    date: monthName,
                    visitor: visitor,
                });
            }

            res.status(200).json(data);

        } else { return res.status(404).send('nothing found !') }
    } catch (error) {
        console.log(error.message)
    }
}
const adminConsultStatByTime = async (req, res) => {
    try {
        const { time } = req.params
        const hist = await History.find()
        if (time == 'jour') {
            if (!hist) {
                const today = new Date();
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - 6);

                const data = [];
                const dayCount = 7;

                for (let i = 0; i < dayCount; i++) {
                    const date = new Date(weekStart);
                    date.setDate(date.getDate() + i);

                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    const courCount = 0
                    const videoCount = 0
                    const audioCount = 0
                    data.push({
                        date: dateString,
                        cour: courCount,
                        video: videoCount,
                        audio: audioCount
                    });
                }
                res.status(200).json(data)
            }
            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - 6);

            const data = [];
            const dayCount = 7;
            for (let i = 0; i < dayCount; i++) {
                let courCount = 0
                let videoCount = 0
                let audioCount = 0
                const date = new Date(weekStart);
                date.setDate(date.getDate() + i);

                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear().toString();
                const dateString = `${day}/${month}/${year}`;

                hist.forEach(h => {
                    courCount += h.cours.filter(c => c.date === dateString).length
                    videoCount += h.video.filter(v => v.date === dateString).length
                    audioCount += h.audio.filter(a => a.date === dateString).length
                })

                data.push({
                    date: dateString,
                    cour: courCount,
                    video: videoCount,
                    audio: audioCount
                });
            }
            res.status(200).json(data)
        } else if (time == 'semaine') {
            if (!hist) {
                const today = new Date();
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                const weekStart = new Date(monthStart);

                const data = [];
                const weekCount = 4;

                for (let i = 0; i < weekCount; i++) {
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 7);

                    const weekNum = i + 1;
                    const weekString = `semaine ${weekNum}`;

                    let courWeekCount = 0;
                    let videoWeekCount = 0;
                    let audioWeekCount = 0;

                    for (let j = 0; j < 6; j++) {
                        const date = new Date(weekStart);
                        date.setDate(weekStart.getDate() + j);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const year = date.getFullYear().toString();
                        const dateString = `${day}/${month}/${year}`;
                    }

                    data.push({
                        date: weekString,
                        cour: courWeekCount,
                        video: videoWeekCount,
                        audio: audioWeekCount,
                    });

                    weekStart.setDate(weekEnd.getDate() + 1);
                }

                res.status(200).json(data);
            }
            const today = new Date();
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            const weekStart = new Date(monthStart);

            const data = [];
            const weekCount = 4;

            for (let i = 0; i < weekCount; i++) {
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 7);

                const weekNum = i + 1;
                const weekString = `semaine ${weekNum}`;
                let courWeekCount = 0;
                let videoWeekCount = 0;
                let audioWeekCount = 0;

                for (let j = 0; j < 7; j++) {
                    const date = new Date(weekStart);
                    date.setDate(weekStart.getDate() + j);
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    hist.forEach(h => {
                        courWeekCount += h.cours.filter(c => c.date === dateString).length
                        videoWeekCount += h.video.filter(v => v.date === dateString).length
                        audioWeekCount += h.audio.filter(a => a.date === dateString).length
                    })
                }

                data.push({
                    date: weekString,
                    cour: courWeekCount,
                    video: videoWeekCount,
                    audio: audioWeekCount,
                });

                weekStart.setDate(weekEnd.getDate() + 1);
            }

            console.log(data);
            res.status(200).json(data);
        } else if (time == 'mois') {
            if (!hist) {
                const today = new Date();
                const yearStart = new Date(today.getFullYear(), 0, 1);

                const data = [];
                const monthCount = 12;

                for (let i = 0; i < monthCount; i++) {
                    const date = new Date(yearStart);
                    date.setMonth(date.getMonth() + i);

                    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

                    const courCount = 0;
                    const videoCount = 0;
                    const audioCount = 0;

                    const monthData = {
                        date: monthName,
                        cour: courCount,
                        video: videoCount,
                        audio: audioCount
                    };

                    data.push(monthData);
                }
                res.status(200).json(data);
            }
            const today = new Date();
            const yearStart = new Date(today.getFullYear(), 0, 1);

            const data = [];
            const monthCount = 12;

            for (let i = 0; i < monthCount; i++) {
                const date = new Date(yearStart);
                date.setMonth(date.getMonth() + i);

                const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

                const courCount = 0;
                const videoCount = 0;
                const audioCount = 0;

                const monthData = {
                    date: monthName,
                    cour: courCount,
                    video: videoCount,
                    audio: audioCount
                };

                data.push(monthData);
            }

            hist.forEach(h => {
                h.cours.forEach(course => {
                    const courseDateParts = course.date.split('/');
                    const courseDate = new Date(
                        parseInt(courseDateParts[2]), // year
                        parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                        parseInt(courseDateParts[0]) // day
                    );
                    const courseMonth = courseDate.getMonth();
                    const courseYear = courseDate.getFullYear();
                    const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(courseDate));
                    if (monthData) {
                        monthData.cour += 1;
                    }
                });
                h.video.forEach(video => {
                    const courseDateParts = video.date.split('/');
                    const videoDate = new Date(
                        parseInt(courseDateParts[2]), // year
                        parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                        parseInt(courseDateParts[0]) // day
                    );
                    const videoMonth = videoDate.getMonth();
                    const videoYear = videoDate.getFullYear();
                    const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(videoDate));
                    if (monthData) {
                        monthData.video += 1;
                    }
                });
                h.audio.forEach(audio => {
                    const courseDateParts = audio.date.split('/');
                    const audioDate = new Date(
                        parseInt(courseDateParts[2]), // year
                        parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                        parseInt(courseDateParts[0]) // day
                    );
                    const audioMonth = audioDate.getMonth();
                    const audioYear = audioDate.getFullYear();
                    const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(audioDate));
                    if (monthData) {
                        monthData.audio += 1;
                    }
                });
            })

            console.log(data);
            res.status(200).json(data);
        } else { return res.status(404).send('nothing found !') }
    } catch (error) {
        console.log(error.message)
    }
}
const adminConsultStatByTimeAndModule = async (req, res) => {
    try {
        const { time, module } = req.params
        const hist = await History.find({ "module.id": module })
        if (time == 'jour') {
            if (!hist) {
                const today = new Date();
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - 6);

                const data = [];
                const dayCount = 7;

                for (let i = 0; i < dayCount; i++) {
                    const date = new Date(weekStart);
                    date.setDate(date.getDate() + i);

                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    const courCount = 0
                    const videoCount = 0
                    const audioCount = 0
                    data.push({
                        date: dateString,
                        cour: courCount,
                        video: videoCount,
                        audio: audioCount
                    });
                }
                res.status(200).json(data)
            }
            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - 6);

            const data = [];
            const dayCount = 7;
            for (let i = 0; i < dayCount; i++) {
                let courCount = 0
                let videoCount = 0
                let audioCount = 0
                const date = new Date(weekStart);
                date.setDate(date.getDate() + i);

                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear().toString();
                const dateString = `${day}/${month}/${year}`;

                hist.forEach(h => {
                    courCount += h.cours.filter(c => c.date === dateString && c.module === module).length
                    videoCount += h.video.filter(v => v.date === dateString && v.module === module).length
                    audioCount += h.audio.filter(a => a.date === dateString && a.module === module).length
                })

                data.push({
                    date: dateString,
                    cour: courCount,
                    video: videoCount,
                    audio: audioCount
                });
            }
            res.status(200).json(data)
        } else if (time == 'semaine') {
            if (!hist) {
                const today = new Date();
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                const weekStart = new Date(monthStart);

                const data = [];
                const weekCount = 4;

                for (let i = 0; i < weekCount; i++) {
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 7);

                    const weekNum = i + 1;
                    const weekString = `semaine ${weekNum}`;

                    let courWeekCount = 0;
                    let videoWeekCount = 0;
                    let audioWeekCount = 0;

                    for (let j = 0; j < 6; j++) {
                        const date = new Date(weekStart);
                        date.setDate(weekStart.getDate() + j);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const year = date.getFullYear().toString();
                        const dateString = `${day}/${month}/${year}`;
                    }

                    data.push({
                        date: weekString,
                        cour: courWeekCount,
                        video: videoWeekCount,
                        audio: audioWeekCount,
                    });

                    weekStart.setDate(weekEnd.getDate() + 1);
                }

                res.status(200).json(data);
            }
            const today = new Date();
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            const weekStart = new Date(monthStart);

            const data = [];
            const weekCount = 4;

            for (let i = 0; i < weekCount; i++) {
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 7);

                const weekNum = i + 1;
                const weekString = `semaine ${weekNum}`;
                let courWeekCount = 0;
                let videoWeekCount = 0;
                let audioWeekCount = 0;

                for (let j = 0; j < 7; j++) {
                    const date = new Date(weekStart);
                    date.setDate(weekStart.getDate() + j);
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    hist.forEach(h => {
                        courWeekCount += h.cours.filter(c => c.date === dateString && c.module === module).length
                        videoWeekCount += h.video.filter(v => v.date === dateString && v.module === module).length
                        audioWeekCount += h.audio.filter(a => a.date === dateString && a.module === module).length
                    })
                }

                data.push({
                    date: weekString,
                    cour: courWeekCount,
                    video: videoWeekCount,
                    audio: audioWeekCount,
                });

                weekStart.setDate(weekEnd.getDate() + 1);
            }

            console.log(data);
            res.status(200).json(data);
        } else if (time == 'mois') {
            if (!hist) {
                const today = new Date();
                const yearStart = new Date(today.getFullYear(), 0, 1);

                const data = [];
                const monthCount = 12;

                for (let i = 0; i < monthCount; i++) {
                    const date = new Date(yearStart);
                    date.setMonth(date.getMonth() + i);

                    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

                    const courCount = 0;
                    const videoCount = 0;
                    const audioCount = 0;

                    const monthData = {
                        date: monthName,
                        cour: courCount,
                        video: videoCount,
                        audio: audioCount
                    };

                    data.push(monthData);
                }
                res.status(200).json(data);
            }
            const today = new Date();
            const yearStart = new Date(today.getFullYear(), 0, 1);

            const data = [];
            const monthCount = 12;

            for (let i = 0; i < monthCount; i++) {
                const date = new Date(yearStart);
                date.setMonth(date.getMonth() + i);

                const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

                const courCount = 0;
                const videoCount = 0;
                const audioCount = 0;

                const monthData = {
                    date: monthName,
                    cour: courCount,
                    video: videoCount,
                    audio: audioCount
                };

                data.push(monthData);
            }

            hist.forEach(h => {
                h.cours.filter(item => item.module === module).forEach(course => {
                    const courseDateParts = course.date.split('/');
                    const courseDate = new Date(
                        parseInt(courseDateParts[2]), // year
                        parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                        parseInt(courseDateParts[0]) // day
                    );
                    const courseMonth = courseDate.getMonth();
                    const courseYear = courseDate.getFullYear();
                    const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(courseDate));
                    if (monthData) {
                        monthData.cour += 1;
                    }
                });
                h.video.filter(item => item.module === module).forEach(video => {
                    const courseDateParts = video.date.split('/');
                    const videoDate = new Date(
                        parseInt(courseDateParts[2]), // year
                        parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                        parseInt(courseDateParts[0]) // day
                    );
                    const videoMonth = videoDate.getMonth();
                    const videoYear = videoDate.getFullYear();
                    const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(videoDate));
                    if (monthData) {
                        monthData.video += 1;
                    }
                });
                h.audio.filter(item => item.module === module).forEach(audio => {
                    const courseDateParts = audio.date.split('/');
                    const audioDate = new Date(
                        parseInt(courseDateParts[2]), // year
                        parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                        parseInt(courseDateParts[0]) // day
                    );
                    const audioMonth = audioDate.getMonth();
                    const audioYear = audioDate.getFullYear();
                    const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(audioDate));
                    if (monthData) {
                        monthData.audio += 1;
                    }
                });
            })

            console.log(data);
            res.status(200).json(data);
        } else { return res.status(404).send('nothing found !') }
    } catch (error) {
        console.log(error.message)
    }
}
const adminConsultStatByTimeAndAnnee = async (req, res) => {
    try {
        const { time, annee } = req.params
        const hist = await History.find({ "module.annee": annee })
        if (time == 'jour') {
            if (!hist) {
                const today = new Date();
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - 6);

                const data = [];
                const dayCount = 7;

                for (let i = 0; i < dayCount; i++) {
                    const date = new Date(weekStart);
                    date.setDate(date.getDate() + i);

                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    const courCount = 0
                    const videoCount = 0
                    const audioCount = 0
                    data.push({
                        date: dateString,
                        cour: courCount,
                        video: videoCount,
                        audio: audioCount
                    });
                }
                res.status(200).json(data)
            }
            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - 6);

            const data = [];
            const dayCount = 7;
            for (let i = 0; i < dayCount; i++) {
                let courCount = 0
                let videoCount = 0
                let audioCount = 0
                const date = new Date(weekStart);
                date.setDate(date.getDate() + i);

                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear().toString();
                const dateString = `${day}/${month}/${year}`;

                hist.forEach(h => {
                    courCount += h.cours.filter(c => c.date === dateString && c.annee === annee).length
                    videoCount += h.video.filter(v => v.date === dateString && v.annee === annee).length
                    audioCount += h.audio.filter(a => a.date === dateString && a.annee === annee).length
                })

                data.push({
                    date: dateString,
                    cour: courCount,
                    video: videoCount,
                    audio: audioCount
                });
            }
            res.status(200).json(data)
        } else if (time == 'semaine') {
            if (!hist) {
                const today = new Date();
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                const weekStart = new Date(monthStart);

                const data = [];
                const weekCount = 4;

                for (let i = 0; i < weekCount; i++) {
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 7);

                    const weekNum = i + 1;
                    const weekString = `semaine ${weekNum}`;

                    let courWeekCount = 0;
                    let videoWeekCount = 0;
                    let audioWeekCount = 0;

                    for (let j = 0; j < 6; j++) {
                        const date = new Date(weekStart);
                        date.setDate(weekStart.getDate() + j);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const year = date.getFullYear().toString();
                        const dateString = `${day}/${month}/${year}`;
                    }

                    data.push({
                        date: weekString,
                        cour: courWeekCount,
                        video: videoWeekCount,
                        audio: audioWeekCount,
                    });

                    weekStart.setDate(weekEnd.getDate() + 1);
                }

                res.status(200).json(data);
            }
            const today = new Date();
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            const weekStart = new Date(monthStart);

            const data = [];
            const weekCount = 4;

            for (let i = 0; i < weekCount; i++) {
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 7);

                const weekNum = i + 1;
                const weekString = `semaine ${weekNum}`;
                let courWeekCount = 0;
                let videoWeekCount = 0;
                let audioWeekCount = 0;

                for (let j = 0; j < 7; j++) {
                    const date = new Date(weekStart);
                    date.setDate(weekStart.getDate() + j);
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    hist.forEach(h => {
                        courWeekCount += h.cours.filter(c => c.date === dateString && c.annee === annee).length
                        videoWeekCount += h.video.filter(v => v.date === dateString && v.annee === annee).length
                        audioWeekCount += h.audio.filter(a => a.date === dateString && a.annee === annee).length
                    })
                }

                data.push({
                    date: weekString,
                    cour: courWeekCount,
                    video: videoWeekCount,
                    audio: audioWeekCount,
                });

                weekStart.setDate(weekEnd.getDate() + 1);
            }

            console.log(data);
            res.status(200).json(data);
        } else if (time == 'mois') {
            if (!hist) {
                const today = new Date();
                const yearStart = new Date(today.getFullYear(), 0, 1);

                const data = [];
                const monthCount = 12;

                for (let i = 0; i < monthCount; i++) {
                    const date = new Date(yearStart);
                    date.setMonth(date.getMonth() + i);

                    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

                    const courCount = 0;
                    const videoCount = 0;
                    const audioCount = 0;

                    const monthData = {
                        date: monthName,
                        cour: courCount,
                        video: videoCount,
                        audio: audioCount
                    };

                    data.push(monthData);
                }
                res.status(200).json(data);
            }
            const today = new Date();
            const yearStart = new Date(today.getFullYear(), 0, 1);

            const data = [];
            const monthCount = 12;

            for (let i = 0; i < monthCount; i++) {
                const date = new Date(yearStart);
                date.setMonth(date.getMonth() + i);

                const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

                const courCount = 0;
                const videoCount = 0;
                const audioCount = 0;

                const monthData = {
                    date: monthName,
                    cour: courCount,
                    video: videoCount,
                    audio: audioCount
                };

                data.push(monthData);
            }

            hist.forEach(h => {
                h.cours.filter(item => item.annee === annee).forEach(course => {
                    const courseDateParts = course.date.split('/');
                    const courseDate = new Date(
                        parseInt(courseDateParts[2]), // year
                        parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                        parseInt(courseDateParts[0]) // day
                    );
                    const courseMonth = courseDate.getMonth();
                    const courseYear = courseDate.getFullYear();
                    const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(courseDate));
                    if (monthData) {
                        monthData.cour += 1;
                    }
                });
                h.video.filter(item => item.annee === annee).forEach(video => {
                    const courseDateParts = video.date.split('/');
                    const videoDate = new Date(
                        parseInt(courseDateParts[2]), // year
                        parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                        parseInt(courseDateParts[0]) // day
                    );
                    const videoMonth = videoDate.getMonth();
                    const videoYear = videoDate.getFullYear();
                    const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(videoDate));
                    if (monthData) {
                        monthData.video += 1;
                    }
                });
                h.audio.filter(item => item.annee === annee).forEach(audio => {
                    const courseDateParts = audio.date.split('/');
                    const audioDate = new Date(
                        parseInt(courseDateParts[2]), // year
                        parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                        parseInt(courseDateParts[0]) // day
                    );
                    const audioMonth = audioDate.getMonth();
                    const audioYear = audioDate.getFullYear();
                    const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(audioDate));
                    if (monthData) {
                        monthData.audio += 1;
                    }
                });
            })

            console.log(data);
            res.status(200).json(data);
        } else { return res.status(404).send('nothing found !') }
    } catch (error) {
        console.log(error.message)
    }
}
const adminConsultStatByTimeAndType = async (req, res) => {
    try {
        const { time, type } = req.params
        const hist = await History.find({ utype: type })
        console.log(hist)
        if (time == 'jour') {
            if (!hist) {
                const today = new Date();
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - 6);

                const data = [];
                const dayCount = 7;

                for (let i = 0; i < dayCount; i++) {
                    const date = new Date(weekStart);
                    date.setDate(date.getDate() + i);

                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    const courCount = 0
                    const videoCount = 0
                    const audioCount = 0
                    data.push({
                        date: dateString,
                        cour: courCount,
                        video: videoCount,
                        audio: audioCount
                    });
                }
                res.status(200).json(data)
            }
            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - 6);

            const data = [];
            const dayCount = 7;
            for (let i = 0; i < dayCount; i++) {
                let courCount = 0
                let videoCount = 0
                let audioCount = 0
                const date = new Date(weekStart);
                date.setDate(date.getDate() + i);

                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear().toString();
                const dateString = `${day}/${month}/${year}`;

                hist.forEach(h => {
                    courCount += h.cours.filter(c => c.date === dateString).length
                    videoCount += h.video.filter(v => v.date === dateString).length
                    audioCount += h.audio.filter(a => a.date === dateString).length
                })

                data.push({
                    date: dateString,
                    cour: courCount,
                    video: videoCount,
                    audio: audioCount
                });
            }
            res.status(200).json(data)
        } else if (time == 'semaine') {
            if (!hist) {
                const today = new Date();
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                const weekStart = new Date(monthStart);

                const data = [];
                const weekCount = 4;

                for (let i = 0; i < weekCount; i++) {
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 7);

                    const weekNum = i + 1;
                    const weekString = `semaine ${weekNum}`;

                    let courWeekCount = 0;
                    let videoWeekCount = 0;
                    let audioWeekCount = 0;

                    for (let j = 0; j < 6; j++) {
                        const date = new Date(weekStart);
                        date.setDate(weekStart.getDate() + j);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const year = date.getFullYear().toString();
                        const dateString = `${day}/${month}/${year}`;
                    }

                    data.push({
                        date: weekString,
                        cour: courWeekCount,
                        video: videoWeekCount,
                        audio: audioWeekCount,
                    });

                    weekStart.setDate(weekEnd.getDate() + 1);
                }

                res.status(200).json(data);
            }
            const today = new Date();
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            const weekStart = new Date(monthStart);

            const data = [];
            const weekCount = 4;

            for (let i = 0; i < weekCount; i++) {
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 7);

                const weekNum = i + 1;
                const weekString = `semaine ${weekNum}`;
                let courWeekCount = 0;
                let videoWeekCount = 0;
                let audioWeekCount = 0;

                for (let j = 0; j < 7; j++) {
                    const date = new Date(weekStart);
                    date.setDate(weekStart.getDate() + j);
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    hist.forEach(h => {
                        courWeekCount += h.cours.filter(c => c.date === dateString).length
                        videoWeekCount += h.video.filter(v => v.date === dateString).length
                        audioWeekCount += h.audio.filter(a => a.date === dateString).length
                    })
                }

                data.push({
                    date: weekString,
                    cour: courWeekCount,
                    video: videoWeekCount,
                    audio: audioWeekCount,
                });

                weekStart.setDate(weekEnd.getDate() + 1);
            }

            console.log(data);
            res.status(200).json(data);
        } else if (time == 'mois') {
            if (!hist) {
                const today = new Date();
                const yearStart = new Date(today.getFullYear(), 0, 1);

                const data = [];
                const monthCount = 12;

                for (let i = 0; i < monthCount; i++) {
                    const date = new Date(yearStart);
                    date.setMonth(date.getMonth() + i);

                    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

                    const courCount = 0;
                    const videoCount = 0;
                    const audioCount = 0;

                    const monthData = {
                        date: monthName,
                        cour: courCount,
                        video: videoCount,
                        audio: audioCount
                    };

                    data.push(monthData);
                }
                res.status(200).json(data);
            }
            const today = new Date();
            const yearStart = new Date(today.getFullYear(), 0, 1);

            const data = [];
            const monthCount = 12;

            for (let i = 0; i < monthCount; i++) {
                const date = new Date(yearStart);
                date.setMonth(date.getMonth() + i);

                const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

                const courCount = 0;
                const videoCount = 0;
                const audioCount = 0;

                const monthData = {
                    date: monthName,
                    cour: courCount,
                    video: videoCount,
                    audio: audioCount
                };

                data.push(monthData);
            }

            hist.forEach(h => {
                h.cours.forEach(course => {
                    const courseDateParts = course.date.split('/');
                    const courseDate = new Date(
                        parseInt(courseDateParts[2]), // year
                        parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                        parseInt(courseDateParts[0]) // day
                    );
                    const courseMonth = courseDate.getMonth();
                    const courseYear = courseDate.getFullYear();
                    const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(courseDate));
                    if (monthData) {
                        monthData.cour += 1;
                    }
                });
                h.video.forEach(video => {
                    const courseDateParts = video.date.split('/');
                    const videoDate = new Date(
                        parseInt(courseDateParts[2]), // year
                        parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                        parseInt(courseDateParts[0]) // day
                    );
                    const videoMonth = videoDate.getMonth();
                    const videoYear = videoDate.getFullYear();
                    const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(videoDate));
                    if (monthData) {
                        monthData.video += 1;
                    }
                });
                h.audio.forEach(audio => {
                    const courseDateParts = audio.date.split('/');
                    const audioDate = new Date(
                        parseInt(courseDateParts[2]), // year
                        parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                        parseInt(courseDateParts[0]) // day
                    );
                    const audioMonth = audioDate.getMonth();
                    const audioYear = audioDate.getFullYear();
                    const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(audioDate));
                    if (monthData) {
                        monthData.audio += 1;
                    }
                });
            })

            console.log(data);
            res.status(200).json(data);
        } else { return res.status(404).send('nothing found !') }
    } catch (error) {
        console.log(error.message)
    }
}
const adminConsultStatByTimeAndModuleAndAnnee = async (req, res) => {
    try {
        const { time, module, annee } = req.params
        const hist = await History.find({ "module.id": module, "module.annee": annee })
        if (time == 'jour') {
            if (!hist) {
                const today = new Date();
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - 6);

                const data = [];
                const dayCount = 7;

                for (let i = 0; i < dayCount; i++) {
                    const date = new Date(weekStart);
                    date.setDate(date.getDate() + i);

                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    const courCount = 0
                    const videoCount = 0
                    const audioCount = 0
                    data.push({
                        date: dateString,
                        cour: courCount,
                        video: videoCount,
                        audio: audioCount
                    });
                }
                res.status(200).json(data)
            }
            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - 6);

            const data = [];
            const dayCount = 7;
            for (let i = 0; i < dayCount; i++) {
                let courCount = 0
                let videoCount = 0
                let audioCount = 0
                const date = new Date(weekStart);
                date.setDate(date.getDate() + i);

                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear().toString();
                const dateString = `${day}/${month}/${year}`;

                hist.forEach(h => {
                    courCount += h.cours.filter(c => c.date === dateString && c.annee === annee && c.module === module).length
                    videoCount += h.video.filter(v => v.date === dateString && v.annee === annee && v.module === module).length
                    audioCount += h.audio.filter(a => a.date === dateString && a.annee === annee && a.module === module).length
                })

                data.push({
                    date: dateString,
                    cour: courCount,
                    video: videoCount,
                    audio: audioCount
                });
            }
            res.status(200).json(data)
        } else if (time == 'semaine') {
            if (!hist) {
                const today = new Date();
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                const weekStart = new Date(monthStart);

                const data = [];
                const weekCount = 4;

                for (let i = 0; i < weekCount; i++) {
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 7);

                    const weekNum = i + 1;
                    const weekString = `semaine ${weekNum}`;

                    let courWeekCount = 0;
                    let videoWeekCount = 0;
                    let audioWeekCount = 0;

                    for (let j = 0; j < 6; j++) {
                        const date = new Date(weekStart);
                        date.setDate(weekStart.getDate() + j);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const year = date.getFullYear().toString();
                        const dateString = `${day}/${month}/${year}`;
                    }

                    data.push({
                        date: weekString,
                        cour: courWeekCount,
                        video: videoWeekCount,
                        audio: audioWeekCount,
                    });

                    weekStart.setDate(weekEnd.getDate() + 1);
                }

                res.status(200).json(data);
            }
            const today = new Date();
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            const weekStart = new Date(monthStart);

            const data = [];
            const weekCount = 4;

            for (let i = 0; i < weekCount; i++) {
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 7);

                const weekNum = i + 1;
                const weekString = `semaine ${weekNum}`;
                let courWeekCount = 0;
                let videoWeekCount = 0;
                let audioWeekCount = 0;

                for (let j = 0; j < 7; j++) {
                    const date = new Date(weekStart);
                    date.setDate(weekStart.getDate() + j);
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    hist.forEach(h => {
                        courCount += h.cours.filter(c => c.date === dateString && c.annee === annee && c.module === module).length
                        videoCount += h.video.filter(v => v.date === dateString && v.annee === annee && v.module === module).length
                        audioCount += h.audio.filter(a => a.date === dateString && a.annee === annee && a.module === module).length
                    })
                }

                data.push({
                    date: weekString,
                    cour: courWeekCount,
                    video: videoWeekCount,
                    audio: audioWeekCount,
                });

                weekStart.setDate(weekEnd.getDate() + 1);
            }

            console.log(data);
            res.status(200).json(data);
        } else if (time == 'mois') {
            if (!hist) {
                const today = new Date();
                const yearStart = new Date(today.getFullYear(), 0, 1);

                const data = [];
                const monthCount = 12;

                for (let i = 0; i < monthCount; i++) {
                    const date = new Date(yearStart);
                    date.setMonth(date.getMonth() + i);

                    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

                    const courCount = 0;
                    const videoCount = 0;
                    const audioCount = 0;

                    const monthData = {
                        date: monthName,
                        cour: courCount,
                        video: videoCount,
                        audio: audioCount
                    };

                    data.push(monthData);
                }
                res.status(200).json(data);
            }
            const today = new Date();
            const yearStart = new Date(today.getFullYear(), 0, 1);

            const data = [];
            const monthCount = 12;

            for (let i = 0; i < monthCount; i++) {
                const date = new Date(yearStart);
                date.setMonth(date.getMonth() + i);

                const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

                const courCount = 0;
                const videoCount = 0;
                const audioCount = 0;

                const monthData = {
                    date: monthName,
                    cour: courCount,
                    video: videoCount,
                    audio: audioCount
                };

                data.push(monthData);
            }

            hist.forEach(h => {
                h.cours.filter(item => item.module === module && item.annee === annee).forEach(course => {
                    const courseDateParts = course.date.split('/');
                    const courseDate = new Date(
                        parseInt(courseDateParts[2]), // year
                        parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                        parseInt(courseDateParts[0]) // day
                    );
                    const courseMonth = courseDate.getMonth();
                    const courseYear = courseDate.getFullYear();
                    const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(courseDate));
                    if (monthData) {
                        monthData.cour += 1;
                    }
                });
                h.video.filter(item => item.module === module && item.annee === annee).forEach(video => {
                    const courseDateParts = video.date.split('/');
                    const videoDate = new Date(
                        parseInt(courseDateParts[2]), // year
                        parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                        parseInt(courseDateParts[0]) // day
                    );
                    const videoMonth = videoDate.getMonth();
                    const videoYear = videoDate.getFullYear();
                    const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(videoDate));
                    if (monthData) {
                        monthData.video += 1;
                    }
                });
                h.audio.filter(item => item.module === module && item.annee === annee).forEach(audio => {
                    const courseDateParts = audio.date.split('/');
                    const audioDate = new Date(
                        parseInt(courseDateParts[2]), // year
                        parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                        parseInt(courseDateParts[0]) // day
                    );
                    const audioMonth = audioDate.getMonth();
                    const audioYear = audioDate.getFullYear();
                    const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(audioDate));
                    if (monthData) {
                        monthData.audio += 1;
                    }
                });
            })

            console.log(data);
            res.status(200).json(data);
        } else { return res.status(404).send('nothing found !') }
    } catch (error) {
        console.log(error.message)
    }
}
const adminConsultStatByTimeAndModuleAndType = async (req, res) => {
    try {
        const { time, module, type } = req.params
        const hist = await History.find({ "module.id": module, utype: type })
        console.log('hist')
        console.log(hist)
        if (time == 'jour') {
            if (!hist) {
                const today = new Date();
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - 6);

                const data = [];
                const dayCount = 7;

                for (let i = 0; i < dayCount; i++) {
                    const date = new Date(weekStart);
                    date.setDate(date.getDate() + i);

                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    const courCount = 0
                    const videoCount = 0
                    const audioCount = 0
                    data.push({
                        date: dateString,
                        cour: courCount,
                        video: videoCount,
                        audio: audioCount
                    });
                }
                res.status(200).json(data)
            }
            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - 6);

            const data = [];
            const dayCount = 7;
            for (let i = 0; i < dayCount; i++) {
                let courCount = 0
                let videoCount = 0
                let audioCount = 0
                const date = new Date(weekStart);
                date.setDate(date.getDate() + i);

                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear().toString();
                const dateString = `${day}/${month}/${year}`;

                hist.forEach(h => {
                    courCount += h.cours.filter(c => c.date === dateString && c.module === module).length
                    videoCount += h.video.filter(v => v.date === dateString && v.module === module).length
                    audioCount += h.audio.filter(a => a.date === dateString && a.module === module).length
                })

                data.push({
                    date: dateString,
                    cour: courCount,
                    video: videoCount,
                    audio: audioCount
                });
            }
            res.status(200).json(data)
        } else if (time == 'semaine') {
            if (!hist) {
                const today = new Date();
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                const weekStart = new Date(monthStart);

                const data = [];
                const weekCount = 4;

                for (let i = 0; i < weekCount; i++) {
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 7);

                    const weekNum = i + 1;
                    const weekString = `semaine ${weekNum}`;

                    let courWeekCount = 0;
                    let videoWeekCount = 0;
                    let audioWeekCount = 0;

                    for (let j = 0; j < 6; j++) {
                        const date = new Date(weekStart);
                        date.setDate(weekStart.getDate() + j);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const year = date.getFullYear().toString();
                        const dateString = `${day}/${month}/${year}`;
                    }

                    data.push({
                        date: weekString,
                        cour: courWeekCount,
                        video: videoWeekCount,
                        audio: audioWeekCount,
                    });

                    weekStart.setDate(weekEnd.getDate() + 1);
                }

                res.status(200).json(data);
            }
            const today = new Date();
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            const weekStart = new Date(monthStart);

            const data = [];
            const weekCount = 4;

            for (let i = 0; i < weekCount; i++) {
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 7);

                const weekNum = i + 1;
                const weekString = `semaine ${weekNum}`;
                let courWeekCount = 0;
                let videoWeekCount = 0;
                let audioWeekCount = 0;

                for (let j = 0; j < 7; j++) {
                    const date = new Date(weekStart);
                    date.setDate(weekStart.getDate() + j);
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    hist.forEach(h => {
                        courWeekCount += h.cours.filter(c => c.date === dateString && c.module === module).length
                        videoWeekCount += h.video.filter(v => v.date === dateString && v.module === module).length
                        audioWeekCount += h.audio.filter(a => a.date === dateString && a.module === module).length
                    })
                }

                data.push({
                    date: weekString,
                    cour: courWeekCount,
                    video: videoWeekCount,
                    audio: audioWeekCount,
                });

                weekStart.setDate(weekEnd.getDate() + 1);
            }

            console.log(data);
            res.status(200).json(data);
        } else if (time == 'mois') {
            if (!hist) {
                const today = new Date();
                const yearStart = new Date(today.getFullYear(), 0, 1);

                const data = [];
                const monthCount = 12;

                for (let i = 0; i < monthCount; i++) {
                    const date = new Date(yearStart);
                    date.setMonth(date.getMonth() + i);

                    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

                    const courCount = 0;
                    const videoCount = 0;
                    const audioCount = 0;

                    const monthData = {
                        date: monthName,
                        cour: courCount,
                        video: videoCount,
                        audio: audioCount
                    };

                    data.push(monthData);
                }
                res.status(200).json(data);
            }
            const today = new Date();
            const yearStart = new Date(today.getFullYear(), 0, 1);

            const data = [];
            const monthCount = 12;

            for (let i = 0; i < monthCount; i++) {
                const date = new Date(yearStart);
                date.setMonth(date.getMonth() + i);

                const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

                const courCount = 0;
                const videoCount = 0;
                const audioCount = 0;

                const monthData = {
                    date: monthName,
                    cour: courCount,
                    video: videoCount,
                    audio: audioCount
                };

                data.push(monthData);
            }

            hist.forEach(h => {
                h.cours.filter(item => item.module === module).forEach(course => {
                    const courseDateParts = course.date.split('/');
                    const courseDate = new Date(
                        parseInt(courseDateParts[2]), // year
                        parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                        parseInt(courseDateParts[0]) // day
                    );
                    const courseMonth = courseDate.getMonth();
                    const courseYear = courseDate.getFullYear();
                    const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(courseDate));
                    if (monthData) {
                        monthData.cour += 1;
                    }
                });
                h.video.filter(item => item.module === module).forEach(video => {
                    const courseDateParts = video.date.split('/');
                    const videoDate = new Date(
                        parseInt(courseDateParts[2]), // year
                        parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                        parseInt(courseDateParts[0]) // day
                    );
                    const videoMonth = videoDate.getMonth();
                    const videoYear = videoDate.getFullYear();
                    const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(videoDate));
                    if (monthData) {
                        monthData.video += 1;
                    }
                });
                h.audio.filter(item => item.module === module).forEach(audio => {
                    const courseDateParts = audio.date.split('/');
                    const audioDate = new Date(
                        parseInt(courseDateParts[2]), // year
                        parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                        parseInt(courseDateParts[0]) // day
                    );
                    const audioMonth = audioDate.getMonth();
                    const audioYear = audioDate.getFullYear();
                    const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(audioDate));
                    if (monthData) {
                        monthData.audio += 1;
                    }
                });
            })

            console.log(data);
            res.status(200).json(data);
        } else { return res.status(404).send('nothing found !') }
    } catch (error) {
        console.log(error.message)
    }
}
const adminConsultStatByTimeAndAnneeAndType = async (req, res) => {
    try {
        const { time, annee, type } = req.params
        const hist = await History.find({ "module.annee": annee, utype: type })
        if (time == 'jour') {
            if (!hist) {
                const today = new Date();
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - 6);

                const data = [];
                const dayCount = 7;

                for (let i = 0; i < dayCount; i++) {
                    const date = new Date(weekStart);
                    date.setDate(date.getDate() + i);

                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    const courCount = 0
                    const videoCount = 0
                    const audioCount = 0
                    data.push({
                        date: dateString,
                        cour: courCount,
                        video: videoCount,
                        audio: audioCount
                    });
                }
                res.status(200).json(data)
            }
            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - 6);

            const data = [];
            const dayCount = 7;
            for (let i = 0; i < dayCount; i++) {
                let courCount = 0
                let videoCount = 0
                let audioCount = 0
                const date = new Date(weekStart);
                date.setDate(date.getDate() + i);

                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear().toString();
                const dateString = `${day}/${month}/${year}`;

                hist.forEach(h => {
                    courCount += h.cours.filter(c => c.date === dateString && c.annee === annee).length
                    videoCount += h.video.filter(v => v.date === dateString && v.annee === annee).length
                    audioCount += h.audio.filter(a => a.date === dateString && a.annee === annee).length
                })

                data.push({
                    date: dateString,
                    cour: courCount,
                    video: videoCount,
                    audio: audioCount
                });
            }
            res.status(200).json(data)
        } else if (time == 'semaine') {
            if (!hist) {
                const today = new Date();
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                const weekStart = new Date(monthStart);

                const data = [];
                const weekCount = 4;

                for (let i = 0; i < weekCount; i++) {
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 7);

                    const weekNum = i + 1;
                    const weekString = `semaine ${weekNum}`;

                    let courWeekCount = 0;
                    let videoWeekCount = 0;
                    let audioWeekCount = 0;

                    for (let j = 0; j < 6; j++) {
                        const date = new Date(weekStart);
                        date.setDate(weekStart.getDate() + j);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const year = date.getFullYear().toString();
                        const dateString = `${day}/${month}/${year}`;
                    }

                    data.push({
                        date: weekString,
                        cour: courWeekCount,
                        video: videoWeekCount,
                        audio: audioWeekCount,
                    });

                    weekStart.setDate(weekEnd.getDate() + 1);
                }

                res.status(200).json(data);
            }
            const today = new Date();
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            const weekStart = new Date(monthStart);

            const data = [];
            const weekCount = 4;

            for (let i = 0; i < weekCount; i++) {
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 7);

                const weekNum = i + 1;
                const weekString = `semaine ${weekNum}`;
                let courWeekCount = 0;
                let videoWeekCount = 0;
                let audioWeekCount = 0;

                for (let j = 0; j < 7; j++) {
                    const date = new Date(weekStart);
                    date.setDate(weekStart.getDate() + j);
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    hist.forEach(h => {
                        courWeekCount += h.cours.filter(c => c.date === dateString && c.annee === annee).length
                        videoWeekCount += h.video.filter(v => v.date === dateString && v.annee === annee).length
                        audioWeekCount += h.audio.filter(a => a.date === dateString && a.annee === annee).length
                    })
                }

                data.push({
                    date: weekString,
                    cour: courWeekCount,
                    video: videoWeekCount,
                    audio: audioWeekCount,
                });

                weekStart.setDate(weekEnd.getDate() + 1);
            }

            console.log(data);
            res.status(200).json(data);
        } else if (time == 'mois') {
            if (!hist) {
                const today = new Date();
                const yearStart = new Date(today.getFullYear(), 0, 1);

                const data = [];
                const monthCount = 12;

                for (let i = 0; i < monthCount; i++) {
                    const date = new Date(yearStart);
                    date.setMonth(date.getMonth() + i);

                    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

                    const courCount = 0;
                    const videoCount = 0;
                    const audioCount = 0;

                    const monthData = {
                        date: monthName,
                        cour: courCount,
                        video: videoCount,
                        audio: audioCount
                    };

                    data.push(monthData);
                }
                res.status(200).json(data);
            }
            const today = new Date();
            const yearStart = new Date(today.getFullYear(), 0, 1);

            const data = [];
            const monthCount = 12;

            for (let i = 0; i < monthCount; i++) {
                const date = new Date(yearStart);
                date.setMonth(date.getMonth() + i);

                const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

                const courCount = 0;
                const videoCount = 0;
                const audioCount = 0;

                const monthData = {
                    date: monthName,
                    cour: courCount,
                    video: videoCount,
                    audio: audioCount
                };

                data.push(monthData);
            }

            hist.forEach(h => {
                h.cours.filter(item => item.annee === annee).forEach(course => {
                    const courseDateParts = course.date.split('/');
                    const courseDate = new Date(
                        parseInt(courseDateParts[2]), // year
                        parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                        parseInt(courseDateParts[0]) // day
                    );
                    const courseMonth = courseDate.getMonth();
                    const courseYear = courseDate.getFullYear();
                    const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(courseDate));
                    if (monthData) {
                        monthData.cour += 1;
                    }
                });
                h.video.filter(item => item.annee === annee).forEach(video => {
                    const courseDateParts = video.date.split('/');
                    const videoDate = new Date(
                        parseInt(courseDateParts[2]), // year
                        parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                        parseInt(courseDateParts[0]) // day
                    );
                    const videoMonth = videoDate.getMonth();
                    const videoYear = videoDate.getFullYear();
                    const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(videoDate));
                    if (monthData) {
                        monthData.video += 1;
                    }
                });
                h.audio.filter(item => item.annee === annee).forEach(audio => {
                    const courseDateParts = audio.date.split('/');
                    const audioDate = new Date(
                        parseInt(courseDateParts[2]), // year
                        parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                        parseInt(courseDateParts[0]) // day
                    );
                    const audioMonth = audioDate.getMonth();
                    const audioYear = audioDate.getFullYear();
                    const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(audioDate));
                    if (monthData) {
                        monthData.audio += 1;
                    }
                });
            })

            console.log(data);
            res.status(200).json(data);
        } else { return res.status(404).send('nothing found !') }
    } catch (error) {
        console.log(error.message)
    }
}
const adminConsultStatByTimeAndModuleAndAnneeAndType = async (req, res) => {
    try {
        const { time, module, annee, type } = req.params
        const hist = await History.find({ "module.id": module, "module.annee": annee, utype: type })
        if (time == 'jour') {
            if (!hist) {
                const today = new Date();
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - 6);

                const data = [];
                const dayCount = 7;

                for (let i = 0; i < dayCount; i++) {
                    const date = new Date(weekStart);
                    date.setDate(date.getDate() + i);

                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    const courCount = 0
                    const videoCount = 0
                    const audioCount = 0
                    data.push({
                        date: dateString,
                        cour: courCount,
                        video: videoCount,
                        audio: audioCount
                    });
                }
                res.status(200).json(data)
            }
            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - 6);

            const data = [];
            const dayCount = 7;
            for (let i = 0; i < dayCount; i++) {
                let courCount = 0
                let videoCount = 0
                let audioCount = 0
                const date = new Date(weekStart);
                date.setDate(date.getDate() + i);

                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear().toString();
                const dateString = `${day}/${month}/${year}`;

                hist.forEach(h => {
                    courCount += h.cours.filter(c => c.date === dateString && c.annee === annee && c.module === module).length
                    videoCount += h.video.filter(v => v.date === dateString && v.annee === annee && v.module === module).length
                    audioCount += h.audio.filter(a => a.date === dateString && a.annee === annee && a.module === module).length
                })

                data.push({
                    date: dateString,
                    cour: courCount,
                    video: videoCount,
                    audio: audioCount
                });
            }
            res.status(200).json(data)
        } else if (time == 'semaine') {
            if (!hist) {
                const today = new Date();
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                const weekStart = new Date(monthStart);

                const data = [];
                const weekCount = 4;

                for (let i = 0; i < weekCount; i++) {
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 7);

                    const weekNum = i + 1;
                    const weekString = `semaine ${weekNum}`;

                    let courWeekCount = 0;
                    let videoWeekCount = 0;
                    let audioWeekCount = 0;

                    for (let j = 0; j < 6; j++) {
                        const date = new Date(weekStart);
                        date.setDate(weekStart.getDate() + j);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const year = date.getFullYear().toString();
                        const dateString = `${day}/${month}/${year}`;
                    }

                    data.push({
                        date: weekString,
                        cour: courWeekCount,
                        video: videoWeekCount,
                        audio: audioWeekCount,
                    });

                    weekStart.setDate(weekEnd.getDate() + 1);
                }

                res.status(200).json(data);
            }
            const today = new Date();
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            const weekStart = new Date(monthStart);

            const data = [];
            const weekCount = 4;

            for (let i = 0; i < weekCount; i++) {
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 7);

                const weekNum = i + 1;
                const weekString = `semaine ${weekNum}`;
                let courWeekCount = 0;
                let videoWeekCount = 0;
                let audioWeekCount = 0;

                for (let j = 0; j < 7; j++) {
                    const date = new Date(weekStart);
                    date.setDate(weekStart.getDate() + j);
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear().toString();
                    const dateString = `${day}/${month}/${year}`;
                    hist.forEach(h => {
                        courCount += h.cours.filter(c => c.date === dateString && c.annee === annee && c.module === module).length
                        videoCount += h.video.filter(v => v.date === dateString && v.annee === annee && v.module === module).length
                        audioCount += h.audio.filter(a => a.date === dateString && a.annee === annee && a.module === module).length
                    })
                }

                data.push({
                    date: weekString,
                    cour: courWeekCount,
                    video: videoWeekCount,
                    audio: audioWeekCount,
                });

                weekStart.setDate(weekEnd.getDate() + 1);
            }

            console.log(data);
            res.status(200).json(data);
        } else if (time == 'mois') {
            if (!hist) {
                const today = new Date();
                const yearStart = new Date(today.getFullYear(), 0, 1);

                const data = [];
                const monthCount = 12;

                for (let i = 0; i < monthCount; i++) {
                    const date = new Date(yearStart);
                    date.setMonth(date.getMonth() + i);

                    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

                    const courCount = 0;
                    const videoCount = 0;
                    const audioCount = 0;

                    const monthData = {
                        date: monthName,
                        cour: courCount,
                        video: videoCount,
                        audio: audioCount
                    };

                    data.push(monthData);
                }
                res.status(200).json(data);
            }
            const today = new Date();
            const yearStart = new Date(today.getFullYear(), 0, 1);

            const data = [];
            const monthCount = 12;

            for (let i = 0; i < monthCount; i++) {
                const date = new Date(yearStart);
                date.setMonth(date.getMonth() + i);

                const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

                const courCount = 0;
                const videoCount = 0;
                const audioCount = 0;

                const monthData = {
                    date: monthName,
                    cour: courCount,
                    video: videoCount,
                    audio: audioCount
                };

                data.push(monthData);
            }

            hist.forEach(h => {
                h.cours.filter(item => item.module === module && item.annee === annee).forEach(course => {
                    const courseDateParts = course.date.split('/');
                    const courseDate = new Date(
                        parseInt(courseDateParts[2]), // year
                        parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                        parseInt(courseDateParts[0]) // day
                    );
                    const courseMonth = courseDate.getMonth();
                    const courseYear = courseDate.getFullYear();
                    const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(courseDate));
                    if (monthData) {
                        monthData.cour += 1;
                    }
                });
                h.video.filter(item => item.module === module && item.annee === annee).forEach(video => {
                    const courseDateParts = video.date.split('/');
                    const videoDate = new Date(
                        parseInt(courseDateParts[2]), // year
                        parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                        parseInt(courseDateParts[0]) // day
                    );
                    const videoMonth = videoDate.getMonth();
                    const videoYear = videoDate.getFullYear();
                    const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(videoDate));
                    if (monthData) {
                        monthData.video += 1;
                    }
                });
                h.audio.filter(item => item.module === module && item.annee === annee).forEach(audio => {
                    const courseDateParts = audio.date.split('/');
                    const audioDate = new Date(
                        parseInt(courseDateParts[2]), // year
                        parseInt(courseDateParts[1]) - 1, // month (0-indexed)
                        parseInt(courseDateParts[0]) // day
                    );
                    const audioMonth = audioDate.getMonth();
                    const audioYear = audioDate.getFullYear();
                    const monthData = data.find(md => md.date === new Intl.DateTimeFormat('en-US', { month: 'long' }).format(audioDate));
                    if (monthData) {
                        monthData.audio += 1;
                    }
                });
            })

            console.log(data);
            res.status(200).json(data);
        } else { return res.status(404).send('nothing found !') }
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    GetQuizStatBytime,
    GetQuizStatByModuleAndTime,
    GetQuizStatByTimeAndAnnee,
    GetQuizStatByModuleAndTimeAndAnnee,
    GetModulesStatByTime,
    GetModulesStatByModuleAndTime,
    GetModulesStatByModuleAndAnnee,
    GetModulesStatByModuleAndTimeAndAnnee,
    adminGeneralStat,
    adminUserStat,
    adminAbb,
    adminUsersStatByTime,
    adminUsersStatByTimeAndAnnee,
    adminTraficStatByTime,
    adminTraficChart,
    getQuizHome,
    adminConsultStatByTime,
    adminConsultStatByTimeAndModule,
    adminConsultStatByTimeAndModuleAndType,
    adminConsultStatByTimeAndType,
    adminConsultStatByTimeAndModuleAndAnnee,
    adminConsultStatByTimeAndAnnee,
    adminConsultStatByTimeAndAnneeAndType,
    adminConsultStatByTimeAndModuleAndAnneeAndType,
}