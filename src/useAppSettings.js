import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { pageTitles, adminRoutes, navigationLinks } from '@/config';
import { theme } from '@/theme';
import { messages } from '@/navigation';
import { images } from '@/images';

export function useAppSettings(language = 'ko') {
  const route = useRoute();

  const pageTitle = computed(() => {
    if (adminRoutes.includes(route?.name)) {
      return pageTitles.admin;
    }
    return pageTitles[route?.name] || pageTitles.default;
  });

  const isAdminPage = computed(() => adminRoutes.includes(route?.name));

  const headerColor = computed(() => {
    return isAdminPage.value ? theme.colors.header.admin : theme.colors.header.default;
  });

  const footerColor = computed(() => {
    return isAdminPage.value ? theme.colors.footer.admin : theme.colors.footer.default;
  });

  const navigationLinksList = computed(() => {
    const navText = messages[language].navigation;
    return isAdminPage.value ? [] : [
      { name: navText.home, route: '/' },
      { name: navText.guide, route: '/interaction' }
    ];
  });

  const footerTextsList = computed(() => {
    return isAdminPage.value ? messages[language].footer.admin : messages[language].footer.default;
  });

  return {
    pageTitle,
    isAdminPage,
    headerColor,
    footerColor,
    navigationLinksList,
    images,
    footerTextsList
  };
}
