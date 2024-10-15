import { Image, View } from "react-native";
import { Link } from "expo-router";

const Logo = () => (
  <Link href={"/m_homepage"}>
    <View className="h-10 w-10 overflow-hidden">
      <Image
        source={require("~/assets/images/logo.png")}
        className="h-full w-full"
      />
    </View>
  </Link>
);

export default Logo;
