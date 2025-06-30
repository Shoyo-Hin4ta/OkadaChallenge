import toast from 'react-hot-toast';

export const useNotification = () => {
  const success = (message) => {
    toast.success(message, {
      duration: 4000,
      position: 'top-right',
    });
  };

  const error = (message) => {
    toast.error(message, {
      duration: 5000,
      position: 'top-right',
    });
  };

  const loading = (message) => {
    return toast.loading(message, {
      position: 'top-right',
    });
  };

  const dismiss = (toastId) => {
    toast.dismiss(toastId);
  };

  return { success, error, loading, dismiss };
};