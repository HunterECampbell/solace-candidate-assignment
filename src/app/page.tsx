"use client";

import { useEffect, useState } from "react";
import { Advocate, Specialty } from "./types";
import "./styles/page.css";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    const includesSpecialty = (specialties: Specialty[]): boolean => {
      return specialties
        .map((specialty) => specialty.toLowerCase())
        .includes(searchTerm.toLowerCase());
    };

    const filteredAdvocates = advocates.filter((advocate: Advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
        includesSpecialty(advocate.specialties) ||
        advocate.yearsOfExperience === Number(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    setFilteredAdvocates(advocates);
    setSearchTerm("");
    clearSearchInput();
  };

  const formatPhoneNumber = (phoneNumber: number): string => {
    const phoneNumberString = phoneNumber.toString();
    return `(${phoneNumberString.slice(0, 3)}) ${phoneNumberString.slice(
      3,
      6
    )}-${phoneNumberString.slice(6)}`;
  };

  const clearSearchInput = () => {
    const searchInputElement = document.getElementById(
      "search-input"
    ) as HTMLInputElement;
    searchInputElement.value = "";
  };

  return (
    <main id="main-wrapper" className="flex flex-col">
      <header
        id="header-wrapper"
        className="fixed w-screen bg-white px-8 shadow-md flex items-center"
      >
        <h1 id="header" className="text-3xl">
          Solace Advocates
        </h1>
      </header>

      <div id="content-wrapper" className="m-8 flex-grow-1 flex flex-col">
        <div id="search-area" className="my-4">
          <p>
            Searching for: <span id="search-term">{searchTerm}</span>
          </p>
          <label htmlFor="search-input" className="block text-lg">
            Search
          </label>
          <input
            id="search-input"
            className="px-4 py-2 rounded-lg text-lg"
            style={{ border: "1px solid black" }}
            onChange={onChange}
          />
          <button
            id="clear-search-btn"
            onClick={onClick}
            className="text-white font-bold px-4 py-2 rounded-lg text-lg cursor-pointer duration-200"
          >
            Clear Search
          </button>
        </div>

        <div
          id="table-card"
          className="h-full shadow-md overflow-auto custom-scrollbar rounded-3xl mb-8"
        >
          <table className="w-full">
            <thead>
              <tr className="sticky top-0 bg-gray-100">
                <th>First Name</th>
                <th>Last Name</th>
                <th>City</th>
                <th>Degree</th>
                <th>Specialties</th>
                <th>Years of Experience</th>
                <th>Phone Number</th>
              </tr>
            </thead>

            <tbody className="bg-white-100">
              {filteredAdvocates.map((advocate: Advocate) => {
                return (
                  <tr
                    key={`advocate-${advocate.id}`}
                    className="border-t-2 border-b-2 border-solid"
                  >
                    <td>{advocate.firstName}</td>
                    <td>{advocate.lastName}</td>
                    <td>{advocate.city}</td>
                    <td>{advocate.degree}</td>
                    <td>
                      {advocate.specialties.map((specialty, index) => (
                        <div key={`specialty-${index}`}>{specialty}</div>
                      ))}
                    </td>
                    <td>{advocate.yearsOfExperience}</td>
                    <td>{formatPhoneNumber(advocate.phoneNumber)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
