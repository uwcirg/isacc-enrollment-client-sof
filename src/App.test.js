import {birthdaysBetweenDates} from "./util/util";


test("Single birthday in same year", () => {
    let dates = birthdaysBetweenDates(new Date("2022-01-01"), new Date("2023-01-01"), new Date("1991-01-08"));
    expect(dates.length).toBe(1);
    expect(dates).toContainEqual(new Date("2022-01-08"));
});

test("Single birthday next year", () => {
    let dates = birthdaysBetweenDates(new Date("2022-02-01"), new Date("2023-02-01"), new Date("1991-01-08"));
    expect(dates.length).toBe(1);
    expect(dates).toContainEqual(new Date("2023-01-08"));
});

test("Two birthdays across years", () => {
    let dates = birthdaysBetweenDates(new Date("2022-01-01"), new Date("2024-01-01"), new Date("1991-01-08"));
    expect(dates.length).toBe(2);
    expect(dates).toContainEqual(new Date("2022-01-08"));
    expect(dates).toContainEqual(new Date("2023-01-08"));
});

test("No birthday", () => {
    let dates = birthdaysBetweenDates(new Date("2022-08-15"), new Date("2022-09-19"), new Date("1992-07-03"));
    expect(dates.length).toBe(0);
});