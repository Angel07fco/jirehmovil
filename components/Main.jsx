import { useEffect, useState } from "react";
import { Text, ActivityIndicator, View } from "react-native";
import { getLatestGames } from "../lib/metacritic";
import { Screen } from "./Screen";

export default function Main() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getLatestGames().then((games) => {
      setGames(games);
    });
  }, []);

  return (
    <Screen>
      {games.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <View>
          <View className="bg-secondaryBlue">
            <View></View>
          </View>
        </View>
      )}
    </Screen>
  );
}
