import { useEffect, useRef } from 'react';

export function useTracker(activeTab: string) {
  const prevTabRef = useRef<string>(activeTab);

  useEffect(() => {
    const TRACKING_ENDPOINT = 'https://tools.cprajapati.com/tracker/track.php';
    const urlParams = new URLSearchParams(window.location.search);
    
    const cid = urlParams.get('cid') || localStorage.getItem('wmit_active_cid');
    if (urlParams.get('cid')) {
      localStorage.setItem('wmit_active_cid', urlParams.get('cid') || '');
    }
    
    if (!cid) return;

    const visitorId = localStorage.getItem('wmit_visitor_id') ||
      'wmit_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('wmit_visitor_id', visitorId);

    const sessionId = sessionStorage.getItem('wmit_session_id') ||
      'wmit_' + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('wmit_session_id', sessionId);

    const getPageNameForTab = (tab: string) => {
      const path = window.location.pathname;
      const segment = path.replace(/\/$/, "").split("/").pop();
      const basePage = segment ? segment.split('?')[0] : 'Home';
      
      if (tab && tab !== 'home') {
        if (tab === 'order') return 'WhatsApp Order Form';
        return tab.charAt(0).toUpperCase() + tab.slice(1);
      }
      return basePage;
    };

    const sendInitPayload = (tabToTrack: string) => {
      const payload = {
        cid: cid,
        visitor_id: visitorId,
        session_id: sessionId,
        page_name: getPageNameForTab(tabToTrack),
        referrer: document.referrer || '',
        device: window.innerWidth < 768 ? 'Mobile' : 'Desktop',
        browser: navigator.userAgent,
        action: 'init'
      };
      fetch(TRACKING_ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    };

    const sendExitPayload = (tabToTrack: string) => {
      const payload = {
        cid: cid,
        session_id: sessionId,
        page_name: getPageNameForTab(tabToTrack),
        action: 'page_change'
      };

      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        navigator.sendBeacon(TRACKING_ENDPOINT, blob);
      } else {
        fetch(TRACKING_ENDPOINT, {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true
        }).catch(() => {});
      }
    };

    // If it's a tab change, we send exit payload for the previous tab
    if (prevTabRef.current !== activeTab) {
      sendExitPayload(prevTabRef.current);
      prevTabRef.current = activeTab;
    }

    sendInitPayload(activeTab);

    const handleLocationChange = () => {
      sendExitPayload(activeTab);
      setTimeout(() => sendInitPayload(activeTab), 100);
    };

    window.addEventListener('popstate', handleLocationChange);
    
    const handlePageHide = () => {
      sendExitPayload(activeTab);
    };
    window.addEventListener('pagehide', handlePageHide);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendExitPayload(activeTab);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pagehide', handlePageHide);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [activeTab]);
}
