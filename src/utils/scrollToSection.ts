import { Platform, type ScrollView } from "react-native";

let _scrollRef: ScrollView | null = null;

export function registerScrollRef(ref: ScrollView | null) {
  _scrollRef = ref;
}

export function scrollToSection(id: string) {
  if (Platform.OS !== "web") return;

  const element = document.getElementById(id);
  if (!element) return;

  if (_scrollRef) {
    let offsetY = 0;
    let el: HTMLElement | null = element as HTMLElement;

    while (el) {
      offsetY += el.offsetTop;
      const parent = el.offsetParent as HTMLElement | null;
      if (!parent || getComputedStyle(parent).overflow.includes("scroll") || getComputedStyle(parent).overflowY.includes("scroll")) break;
      el = parent;
    }

    (_scrollRef as any).scrollTo({ y: offsetY, animated: true });
    return;
  }

  element.scrollIntoView({ behavior: "smooth", block: "start" });
}
