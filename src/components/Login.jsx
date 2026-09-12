import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, LogIn, UserPlus, ShieldCheck, ShieldAlert,
  Laptop, User, Coffee, Eye, EyeOff, RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { AuthService } from '@/core/services/AuthService';
import Logo from '@/components/ui/Logo';

const Login = ({ onLogin, onClose }) => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'member',
    isStudent: false,
    registrationNumber: '',
    program: '',
    yearOfStudy: '',
    university: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { value: 'superuser', label: 'Superuser', icon: ShieldAlert, color: 'text-red-500' },
    { value: 'facilitator', label: 'Facilitator', icon: ShieldCheck, color: 'text-purple-500' },
    { value: 'coordinator', label: 'Coordinator', icon: Laptop, color: 'text-blue-500' },
    { value: 'member', label: 'Normal Member', icon: User, color: 'text-green-500' },
    { value: 'guest', label: 'Guest', icon: Coffee, color: 'text-gray-500' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignup) {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Passwords mismatch!",
            description: "Please ensure your passwords match.",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }
        await AuthService.register(formData);
        toast({
          title: "Account created! 🎉",
          description: "Successfully registered and logged in."
        });
        window.location.reload(); // Refresh to update state in App.jsx
      } else {
        const success = await onLogin({ email: formData.email, password: formData.password });
        if (success) {
          toast({
            title: "Welcome back! 🚀",
            description: "Successfully logged in to your unique dashboard."
          });
          navigate('/dashboard');
        } else {
          toast({
            title: "Login failed!",
            description: "Invalid credentials. Try guest@y4c.com / password123",
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message || "An error occurred. Please ensure the backend server is running.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 dark:bg-gray-950/80 backdrop-blur-md overflow-y-auto py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-2xl rounded-[3rem] shadow-2xl max-w-xl w-full relative overflow-hidden border border-white/20 dark:border-gray-800 my-auto"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-udsm-blue via-forest-green to-udsm-gold" />

        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-all hover:rotate-90 z-20"
        >
          <X className="h-7 w-7" />
        </button>

        <div className="p-10 max-h-[85vh] overflow-y-auto custom-scrollbar">
          <div className="text-center mb-10 pt-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <Logo iconClassName="h-16 w-16" showText={false} />
            </motion.div>

            <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
              {isSignup ? 'Join the Innovation' : 'Welcome Back'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 font-bold uppercase tracking-widest text-[10px]">
              {isSignup ? 'Create your unique lab profile' : 'Access your personalized dashboard'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {isSignup && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                    <div className="relative">
                      <Input
                        required
                        className="rounded-2xl h-14 bg-gray-50/50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-700 text-lg font-bold px-12"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                      />
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 ml-1">Select Role</label>
                      <div className="relative">
                        <select
                          required
                          className="w-full rounded-2xl h-14 bg-gray-50/50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-700 text-lg font-bold px-12 outline-none focus:ring-2 focus:ring-udsm-blue dark:text-white appearance-none cursor-pointer"
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value, isStudent: false })}
                        >
                          {roles.map((role) => (
                            <option key={role.value} value={role.value}>
                              {role.label}
                            </option>
                          ))}
                        </select>
                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-udsm-blue" />
                      </div>
                    </div>

                    {formData.role === 'member' && (
                      <>
                        <div className="md:col-span-1">
                          <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 ml-1">Reg No</label>
                          <Input
                            required
                            className="rounded-xl h-12 bg-gray-50/50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-700 font-bold px-4"
                            value={formData.registrationNumber}
                            onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                            placeholder="BCS-01-..."
                          />
                        </div>
                        <div className="md:col-span-1">
                          <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 ml-1">University</label>
                          <Input
                            required
                            className="rounded-xl h-12 bg-gray-50/50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-700 font-bold px-4"
                            value={formData.university}
                            onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                            placeholder="UDSM"
                          />
                        </div>
                        <div className="md:col-span-1">
                          <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 ml-1">Program</label>
                          <Input
                            required
                            className="rounded-xl h-12 bg-gray-50/50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-700 font-bold px-4"
                            value={formData.program}
                            onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                            placeholder="Computer Science"
                          />
                        </div>
                        <div className="md:col-span-1">
                          <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 ml-1">Year</label>
                          <select
                            required
                            className="w-full rounded-xl h-12 bg-gray-50/50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-700 font-bold px-4 outline-none focus:ring-2 focus:ring-udsm-blue dark:text-white"
                            value={formData.yearOfStudy}
                            onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                          >
                            <option value="">Select</option>
                            {[1, 2, 3, 4].map(y => <option key={y} value={y}>Year {y}</option>)}
                          </select>
                        </div>
                      </>
                    )}

                    {formData.role === 'guest' && (
                      <div className="md:col-span-2 space-y-4 bg-gray-50/50 dark:bg-gray-800/20 p-6 rounded-3xl border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id="isStudent"
                            className="w-5 h-5 rounded-lg border-gray-300 text-udsm-blue focus:ring-udsm-blue cursor-pointer"
                            checked={formData.isStudent}
                            onChange={(e) => setFormData({ ...formData, isStudent: e.target.checked })}
                          />
                          <label htmlFor="isStudent" className="text-sm font-black text-gray-600 dark:text-gray-300 cursor-pointer uppercase tracking-wider">
                            I am currently a student
                          </label>
                        </div>

                        <AnimatePresence>
                          {formData.isStudent && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                            >
                              <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">University Name</label>
                              <Input
                                required
                                className="rounded-xl h-12 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-700 font-bold px-4"
                                value={formData.university}
                                onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                                placeholder="Where do you study?"
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <div className="relative">
                <Input
                  required
                  type="email"
                  className="rounded-2xl h-14 bg-gray-50/50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-700 text-lg font-bold px-12"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@y4clab.com"
                />
                <LogIn className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={isSignup ? "md:col-span-1" : "md:col-span-2"}>
                <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 ml-1">Password</label>
                <div className="relative">
                  <Input
                    required
                    type={showPassword ? "text" : "password"}
                    className="rounded-2xl h-14 bg-gray-50/50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-700 text-lg font-bold px-4 pr-12"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-udsm-blue transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {isSignup && (
                <div className="md:col-span-1">
                  <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 ml-1">Confirm</label>
                  <Input
                    required
                    type={showPassword ? "text" : "password"}
                    className="rounded-2xl h-14 bg-gray-50/50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-700 text-lg font-bold px-4"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                  />
                </div>
              )}
            </div>

            {!isSignup && (
              <div className="flex justify-end px-1">
                <button type="button" className="text-[10px] font-black text-udsm-blue hover:text-udsm-gold uppercase tracking-widest transition-colors">
                  Forgot Password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-16 rounded-[1.5rem] bg-gradient-to-r from-udsm-blue via-forest-green to-udsm-gold hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-udsm-blue/20 text-xl font-black transition-all mt-4"
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  <span>PROCESSING...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {isSignup ? <UserPlus className="h-6 w-6" /> : <LogIn className="h-6 w-6" />}
                  <span>{isSignup ? 'CREATE LAB ACCOUNT' : 'ACCESS DASHBOARD'}</span>
                </div>
              )}
            </Button>
          </form>

          <div className="mt-10 text-center pb-4">
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setFormData({ email: '', password: '', confirmPassword: '', name: '', role: 'member', isStudent: false, registrationNumber: '', program: '', yearOfStudy: '', university: '' });
              }}
              className="group text-gray-500 dark:text-gray-400 hover:text-udsm-blue dark:hover:text-udsm-gold font-black tracking-widest uppercase text-[10px] transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              {isSignup ? 'Already have an account?' : "Don't have an account?"}
              <span className="text-udsm-blue group-hover:underline">{isSignup ? 'Login Now' : 'Join Y4C Lab'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
