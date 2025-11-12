// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "../Button/Button";
import { BUTTON_TYPES } from "../Button";
import { BackButton } from "../BackButton";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import { Message } from "../Message";
import { Spinner } from "../Spinner";

// eslint-disable-next-line react-refresh/only-export-components
export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState<boolean>(false);

  const [cityName, setCityName] = useState("");
  // const [countryName, setCountryName] = useState("");
  const [date, setDate] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geocodeError, setGeocodeError] = useState<string>("");
  // const emoji = convertToEmoji(countryName)

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        setIsLoadingGeocoding(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode) {
          throw new Error(
            "It does not seem to be a cit. Click somewhere else 😔"
          );
        }
        console.log("data", data);
        setCityName(data.city || data.locallity || "");
        // setCountryName(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
        setGeocodeError("");
      } catch (err: unknown) {
        console.error(err);
        const message =
          err instanceof Error
            ? err.message
            : typeof err === "string"
            ? err
            : "Unknown error";
        setGeocodeError(message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    };
    fetchCityData();
  }, [lat, lng]);

  if (isLoadingGeocoding) return <Spinner />;

  if (geocodeError) return <Message message={geocodeError} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button
          type={BUTTON_TYPES.PRIMARY}
          onClick={() => console.log("primary")}
        >
          <strong>Add</strong>
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
