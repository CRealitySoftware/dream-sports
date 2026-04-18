import { STATUS_CONFIG } from "@/lib/users";
import type { UserStatus } from "@/lib/database.types";
import { Text, View } from "react-native";

type Props = {
  status: UserStatus;
};

export default function StatusBadge({ status }: Props) {
  const { label, color, bg } = STATUS_CONFIG[status];

  return (
    <View
      style={{
        backgroundColor: bg,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 4,
        alignSelf: "flex-start",
      }}
    >
      <Text style={{ color, fontSize: 12, fontWeight: "700" }}>{label}</Text>
    </View>
  );
}
