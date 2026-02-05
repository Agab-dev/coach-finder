import { BASE_URL } from ".";

export async function createOrUpdateCoach(coachId, coachData) {
  try {
    const response = await fetch(BASE_URL + `/coaches/${coachId}.json`, {
      method: "PUT",
      body: JSON.stringify(coachData),
    });

    if (!response.ok) {
      throw new Error("Something went wrong, while submitting coach data");
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}
