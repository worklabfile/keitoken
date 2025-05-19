
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Вспомогательная функция для очистки auth состояния
const cleanupAuthState = () => {
  // Удаляем стандартные auth токены
  localStorage.removeItem('supabase.auth.token');
  // Удаляем все ключи Supabase auth из localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  // Удаляем из sessionStorage если используется
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) navigate('/game');
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) navigate('/game');
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Очищаем существующее auth состояние
      cleanupAuthState();
      
      // Пытаемся выйти глобально, чтобы избежать конфликтов
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Продолжаем даже если это не удалось
      }

      // Формируем email на основе username (это необходимо для supabase auth)
      const generatedEmail = `${username}@keitoken.temp`;
      
      const { error } = await supabase.auth.signUp({
        email: generatedEmail,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (error) throw error;

      // Автоматически входим в аккаунт после регистрации
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: generatedEmail,
        password,
      });

      if (signInError) throw signInError;

      toast({
        title: "Регистрация успешна",
        description: "Добро пожаловать в игру КЭИ Токен!",
      });
      
      // Перезагружаем страницу для обновления состояния
      window.location.href = '/game';
    } catch (error) {
      toast({
        title: "Ошибка регистрации",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Очищаем существующее auth состояние
      cleanupAuthState();
      
      // Пытаемся выйти глобально
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Продолжаем даже если это не удалось
      }

      // Формируем email на основе username
      const generatedEmail = `${username}@keitoken.temp`;
      
      const { error } = await supabase.auth.signInWithPassword({
        email: generatedEmail,
        password,
      });

      if (error) throw error;

      toast({
        title: "Вход успешен",
        description: "Добро пожаловать!",
      });
      
      // Перезагружаем страницу для обновления состояния
      window.location.href = '/game';
    } catch (error) {
      toast({
        title: "Ошибка входа",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen space-bg">
      <NavBar />
      <div className="container max-w-md mx-auto py-32">
        <Card className="glass border-space-accent/20">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="enhanced-coin">
                <div className="coin-inner"></div>
              </div>
            </div>
            <CardTitle className="text-center text-2xl">КЭИ Аккаунт</CardTitle>
            <CardDescription className="text-center">
              Войдите или зарегистрируйтесь, чтобы играть и собирать токены КЭИ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Вход</TabsTrigger>
                <TabsTrigger value="register">Регистрация</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Имя пользователя</Label>
                    <Input 
                      id="username" 
                      type="text" 
                      placeholder="username" 
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-space-dark/80 border-space-accent/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Пароль</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-space-dark/80 border-space-accent/30"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={cn(
                      "crypto-button w-full mt-2 flex items-center justify-center gap-2",
                      loading && "opacity-70"
                    )}
                  >
                    {loading ? "Вход..." : "Войти"} 
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-username">Имя пользователя</Label>
                    <Input 
                      id="register-username" 
                      type="text" 
                      placeholder="username" 
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-space-dark/80 border-space-accent/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Пароль</Label>
                    <Input 
                      id="register-password" 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-space-dark/80 border-space-accent/30"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={cn(
                      "crypto-button w-full mt-2 flex items-center justify-center gap-2",
                      loading && "opacity-70"
                    )}
                  >
                    {loading ? "Регистрация..." : "Зарегистрироваться"} 
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col items-center text-center text-sm text-gray-400">
            <p>Регистрируясь, вы соглашаетесь с условиями использования КЭИ токена</p>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
