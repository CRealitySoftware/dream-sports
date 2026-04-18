import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, type DrawerContentComponentProps } from "@react-navigation/drawer";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

type NavItem = {
  name: string;
  label: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
};

const NAV_ITEMS: NavItem[] = [
  { name: "index",  label: "Dashboard", icon: "grid-outline"   },
  { name: "users",  label: "Usuarios",  icon: "people-outline" },
];

function DrawerContent(props: DrawerContentComponentProps) {
  const { colors } = useTheme();
  const { signOut, user } = useAuth();
  const currentRoute = props.state.routeNames[props.state.index];

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={{ flex: 1 }}
      style={{ backgroundColor: colors.brand }}
    >
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24 }}>
        {/* Logo */}
        <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "800", letterSpacing: -0.3, marginBottom: 32, paddingHorizontal: 8 }}>
          Dream<Text style={{ color: colors.gold }}>Sports</Text>
        </Text>

        {/* Nav items */}
        {NAV_ITEMS.map((item) => {
          const active = currentRoute === item.name;
          return (
            <Pressable
              key={item.name}
              onPress={() => props.navigation.navigate(item.name)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 10,
                marginBottom: 4,
                backgroundColor: active ? "rgba(255,255,255,0.12)" : "transparent",
              }}
            >
              <Ionicons name={item.icon} size={18} color={active ? "#ffffff" : "rgba(255,255,255,0.65)"} />
              <Text style={{ color: active ? "#ffffff" : "rgba(255,255,255,0.65)", fontSize: 14, fontWeight: active ? "700" : "500" }}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}

        <View style={{ flex: 1 }} />

        {/* User + sign out */}
        <Text style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, paddingHorizontal: 12, marginBottom: 8 }} numberOfLines={1}>
          {user?.email}
        </Text>
        <Pressable
          onPress={signOut}
          style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10 }}
        >
          <Ionicons name="log-out-outline" size={18} color="rgba(255,255,255,0.55)" />
          <Text style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, fontWeight: "500" }}>Cerrar sesión</Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
}

export default function MainLayout() {
  const { session, loading } = useAuth();
  const { colors } = useTheme();

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={colors.brand} />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/backoffice/login" />;
  }

  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        drawerType: "permanent",
        drawerStyle: { width: 220, borderRightWidth: 0 },
        headerLeft: () => null,
        headerStyle: {
          backgroundColor: colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        } as never,
        headerTintColor: colors.ink,
        headerTitleStyle: { fontSize: 15, fontWeight: "700" },
        headerShadowVisible: false,
      }}
    >
      <Drawer.Screen name="index" options={{ title: "Dashboard" }} />
      <Drawer.Screen name="users"  options={{ title: "Usuarios"  }} />
    </Drawer>
  );
}
