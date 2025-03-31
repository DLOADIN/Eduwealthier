import React, { useState } from 'react';
import { Star, DollarSign, MessageCircle, BookOpen, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { useUser } from '@clerk/clerk-react'; 
import { Mentor } from '@/types/mentor';
import supabase from '@/supabaseserver'; 

type MentorCardProps = {
  mentor: Mentor;
  onBack?: () => void; // Optional prop to handle going back to list
};

const MentorCard: React.FC<MentorCardProps> = ({ mentor, onBack }) => {
  const { user } = useUser();
  const { toast } = useToast();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    title: '',
    description: '',
    date: '',
    duration: 60,
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Null checks and error handling
  if (!mentor) {
    return <div className="p-4 text-center text-red-500">No mentor data available</div>;
  }

  if (!user) {
    return <div className="p-4 text-center text-gray-500">Please sign in to view mentor details</div>;
  }

  const handleBookSession = async () => {
    try {
      // Set loading state
      setIsSubmitting(true);
      
      // Validate booking data
      if (!bookingData.date) {
        toast({
          title: 'Error',
          description: 'Please select a date for the session',
          variant: 'destructive',
        });
        setIsSubmitting(false);
        return;
      }

      // Prepare session data
      const sessionData = {
        mentor_id: mentor.id,
        mentee_id: user.id,
        title: bookingData.title || `Session with ${mentor.name}`,
        description: bookingData.description,
        session_date: new Date(bookingData.date).toISOString(),
        duration: bookingData.duration,
        price: mentor.hourlyRate * (bookingData.duration / 60),
        status: 'scheduled',
      };

      // Insert data directly into Supabase
      const { data, error } = await supabase
        .from('sessions')
        .insert([sessionData])
        .select();

      if (error) throw error;
      
      toast({
        title: 'Session booked!',
        description: `Your session with ${mentor.name} has been scheduled.`,
      });
      setShowBookingForm(false);
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendMessage = async () => {
    try {
      // Set loading state
      setIsSubmitting(true);
      
      if (!message.trim()) {
        toast({
          title: 'Error',
          description: 'Message cannot be empty',
          variant: 'destructive',
        });
        setIsSubmitting(false);
        return;
      }
  
      // Prepare message data
      const messageData = {
        sender_id: user.id,
        recipient_id: mentor.id,
        content: message,
        is_read: false
      };
  
      // Insert message directly into Supabase
      const { data, error } = await supabase
        .from('messages')
        .insert([messageData])
        .select();
  
      if (error) throw error;
      
      toast({
        title: 'Message sent!',
        description: `Your message to ${mentor.name} has been delivered.`,
      });
      setShowMessageForm(false);
      setMessage('');
    } catch (error) {
      console.error('Message send error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {onBack && (
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="mb-4"
        >
          Back to Mentors
        </Button>
      )}
      
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Star className="text-yellow-500 fill-yellow-500" size={20} />
          <span className="font-semibold">{mentor.rating.toFixed(1)}</span>
          <span className="text-gray-500">({mentor.reviews} reviews)</span>
        </div>
        <div className="flex items-center text-gray-600">
          <DollarSign size={16} className="mr-1" />
          <span>{mentor.hourlyRate}/hr</span>
        </div>
      </div>

      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">{mentor.name}</h2>
        <p className="text-gray-600">{mentor.title}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-md font-semibold mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {mentor.skills.map((skill) => (
            <span
              key={skill}
              className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex space-x-4">
        <Button
          onClick={() => setShowBookingForm(true)}
          className="flex-1 bg-eduwealth-primary text-white py-2 rounded-md hover:bg-eduwealth-primary/90"
        >
          <BookOpen size={16} className="mr-2" />
          Book Session
        </Button>
        <Button
          onClick={() => setShowMessageForm(true)}
          variant="outline"
          className="flex-1 py-2 rounded-md"
        >
          <MessageCircle size={16} className="mr-2" />
          Message
        </Button>
      </div>

      {/* Booking Dialog */}
      <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book Session with {mentor.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={bookingData.title}
                onChange={(e) =>
                  setBookingData({ ...bookingData, title: e.target.value })
                }
                placeholder={`Session with ${mentor.name}`}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Details
              </Label>
              <Textarea
                id="description"
                value={bookingData.description}
                onChange={(e) =>
                  setBookingData({ ...bookingData, description: e.target.value })
                }
                placeholder="What would you like to discuss?"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                <Calendar className="inline mr-2 h-4 w-4" />
                Date
              </Label>
              <Input
                id="date"
                type="datetime-local"
                value={bookingData.date}
                onChange={(e) =>
                  setBookingData({ ...bookingData, date: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                <Clock className="inline mr-2 h-4 w-4" />
                Duration (min)
              </Label>
              <Input
                id="duration"
                type="number"
                min="30"
                max="240"
                step="15"
                value={bookingData.duration}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    duration: parseInt(e.target.value),
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Total</Label>
              <div className="col-span-3 font-medium">
                ${(mentor.hourlyRate * (bookingData.duration / 60)).toFixed(2)}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowBookingForm(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleBookSession} 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Confirm Booking'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Message Dialog */}
      <Dialog open={showMessageForm} onOpenChange={setShowMessageForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Message {mentor.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Write your message to ${mentor.name}...`}
              className="min-h-[120px]"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowMessageForm(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSendMessage} 
              disabled={!message.trim() || isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  </div>
  );
};

export default MentorCard;